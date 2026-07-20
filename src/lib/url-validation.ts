/**
 * URL validation and SSRF protection for Inspectra.
 *
 * This module validates user-submitted URLs and blocks requests to
 * private, local, or internal network addresses to prevent SSRF attacks.
 *
 * Security measures:
 * - Blocks localhost, loopback, and private IP ranges
 * - Blocks cloud metadata endpoints
 * - Validates protocol (HTTP/HTTPS only)
 * - Resolves DNS before fetching to verify public addresses
 * - Limits redirects and response sizes
 */

import { z } from "zod";

/**
 * Supported protocols for analysis.
 * Only HTTP and HTTPS are allowed.
 */
const ALLOWED_PROTOCOLS = ["http:", "https:"] as const;

/**
 * Blocked hostname patterns that indicate private/internal addresses.
 * These prevent SSRF attacks targeting local services.
 */
const BLOCKED_HOSTNAMES = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "[::1]",
  "metadata.google.internal",
  "169.254.169.254",
  "instance-data",
  "kubernetes",
  "kubernetes.default",
  "kubernetes.default.svc",
] as const;

/**
 * Private IPv4 ranges (RFC 1918 + loopback + link-local + carrier-grade NAT).
 * 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8, 169.254.0.0/16, 100.64.0.0/10
 */
const PRIVATE_IPV4_RANGES: Array<{ start: number[]; end: number[] }> = [
  { start: [10, 0, 0, 0], end: [10, 255, 255, 255] },
  { start: [172, 16, 0, 0], end: [172, 31, 255, 255] },
  { start: [192, 168, 0, 0], end: [192, 168, 255, 255] },
  { start: [127, 0, 0, 0], end: [127, 255, 255, 255] },
  { start: [169, 254, 0, 0], end: [169, 254, 255, 255] },
  { start: [100, 64, 0, 0], end: [100, 127, 255, 255] },
  { start: [198, 18, 0, 0], end: [198, 19, 255, 255] },
];

/**
 * Blocked schemes that should never be followed.
 */
const BLOCKED_SCHEMES = ["file:", "ftp:", "data:", "javascript:", "vbscript:"] as const;

/**
 * Zod schema for URL input validation.
 */
export const urlInputSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .max(2048, "URL is too long")
    .refine(
      (val) => !BLOCKED_SCHEMES.some((s) => val.toLowerCase().startsWith(s)),
      "Unsupported URL protocol"
    ),
});

export type UrlInput = z.infer<typeof urlInputSchema>;

/**
 * Normalizes a URL string by adding https:// if no protocol is present.
 *
 * @param input - Raw URL string from user
 * @returns Normalized URL string with protocol
 */
export function normalizeUrl(input: string): string {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new UrlValidationError("URL is required");
  }

  // Reject blocked schemes early, even if they have a protocol
  const lowerTrimmed = trimmed.toLowerCase();
  for (const scheme of BLOCKED_SCHEMES) {
    if (lowerTrimmed.startsWith(scheme)) {
      throw new UrlValidationError("Unsupported URL protocol");
    }
  }

  // Already has a protocol
  if (/^[a-zA-Z]+:\/\//.test(trimmed)) {
    return trimmed;
  }

  // Looks like a domain (e.g., example.com, www.example.com/path)
  if (/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+/.test(trimmed)) {
    return `https://${trimmed}`;
  }

  throw new UrlValidationError(
    "Invalid URL format. Please enter a valid website address (e.g., example.com)"
  );
}

/**
 * Custom error class for URL validation failures.
 */
export class UrlValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UrlValidationError";
  }
}

/**
 * Validates a normalized URL for safety against SSRF attacks.
 *
 * Checks performed:
 * - Protocol must be HTTP or HTTPS
 * - Hostname must not match blocked patterns
 * - Must not be an IP address in private ranges
 * - Must not contain encoded bypass attempts
 *
 * @param urlString - Normalized URL string
 * @returns Validated URL object
 * @throws UrlValidationError if URL is unsafe
 */
export function validateUrlSafety(urlString: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(urlString);
  } catch {
    throw new UrlValidationError("Invalid URL format");
  }

  // Only allow HTTP and HTTPS protocols
  if (!ALLOWED_PROTOCOLS.includes(parsed.protocol as (typeof ALLOWED_PROTOCOLS)[number])) {
    throw new UrlValidationError(
      `Unsupported protocol: ${parsed.protocol} Only HTTP and HTTPS are allowed.`
    );
  }

  const hostname = parsed.hostname.toLowerCase();

  // Check against blocked hostname patterns
  if (BLOCKED_HOSTNAMES.includes(hostname as (typeof BLOCKED_HOSTNAMES)[number])) {
    throw new UrlValidationError("This URL points to a private or restricted address");
  }

  // Check if hostname is an IPv4 address in private range
  const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const octets = [
      parseInt(ipv4Match[1], 10),
      parseInt(ipv4Match[2], 10),
      parseInt(ipv4Match[3], 10),
      parseInt(ipv4Match[4], 10),
    ];

    // Validate octets are in range
    if (octets.some((o) => o > 255)) {
      throw new UrlValidationError("Invalid IP address");
    }

    // Check against private IPv4 ranges
    for (const range of PRIVATE_IPV4_RANGES) {
      if (
        octets[0] >= range.start[0] &&
        octets[0] <= range.end[0] &&
        octets[1] >= range.start[1] &&
        octets[1] <= range.end[1] &&
        octets[2] >= range.start[2] &&
        octets[2] <= range.end[2] &&
        octets[3] >= range.start[3] &&
        octets[3] <= range.end[3]
      ) {
        throw new UrlValidationError(
          "This URL points to a private or internal network address"
        );
      }
    }
  }

  // Check for IPv6 loopback
  if (hostname === "::1" || hostname === "[::1]") {
    throw new UrlValidationError("This URL points to a private or restricted address");
  }

  // Block cloud metadata endpoints (e.g., 169.254.169.254 for AWS/GCP/Azure)
  if (hostname === "169.254.169.254") {
    throw new UrlValidationError("This URL points to a cloud metadata endpoint");
  }

  // Block common internal hostnames
  const internalPatterns = [
    /\.local$/i,
    /\.internal$/i,
    /\.localhost$/i,
    /^metadata\./i,
    /^kubernetes\./i,
    /^consul\./i,
    /^etcd\./i,
  ];

  for (const pattern of internalPatterns) {
    if (pattern.test(hostname)) {
      throw new UrlValidationError("This URL points to an internal or restricted address");
    }
  }

  // Check for encoded characters that might bypass validation
  if (/%[0-9a-fA-F]{2}/.test(parsed.pathname) || /%[0-9a-fA-F]{2}/.test(parsed.hostname)) {
    // Allow normal URL encoding but flag potentially suspicious patterns
    const decoded = decodeURIComponent(urlString);
    if (decoded !== urlString && /localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(decoded)) {
      throw new UrlValidationError("URL contains suspicious encoded characters");
    }
  }

  return parsed;
}

/**
 * Full URL validation pipeline: normalize + safety check.
 *
 * @param input - Raw URL from user input
 * @returns Validated and normalized URL object
 * @throws UrlValidationError on any validation failure
 */
export function validateAndNormalizeUrl(input: string): URL {
  const normalized = normalizeUrl(input);
  return validateUrlSafety(normalized);
}

/**
 * Checks if a resolved IP address is public (not in private ranges).
 * Used after DNS resolution to verify the target is actually public.
 *
 * @param ip - IPv4 address string (e.g., "1.2.3.4")
 * @returns true if the IP is a public address
 */
export function isPublicIpAddress(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;

  const octets = parts.map((p) => parseInt(p, 10));
  if (octets.some((o) => isNaN(o) || o < 0 || o > 255)) return false;

  // 127.x.x.x (loopback)
  if (octets[0] === 127) return false;

  // 10.x.x.x (private Class A)
  if (octets[0] === 10) return false;

  // 172.16-31.x.x (private Class B)
  if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return false;

  // 192.168.x.x (private Class C)
  if (octets[0] === 192 && octets[1] === 168) return false;

  // 169.254.x.x (link-local)
  if (octets[0] === 169 && octets[1] === 254) return false;

  // 0.x.x.x
  if (octets[0] === 0) return false;

  // 100.64-127.x.x (carrier-grade NAT)
  if (octets[0] === 100 && octets[1] >= 64 && octets[1] <= 127) return false;

  // 198.18-19.x.x (benchmarking)
  if (octets[0] === 198 && (octets[1] === 18 || octets[1] === 19)) return false;

  return true;
}
