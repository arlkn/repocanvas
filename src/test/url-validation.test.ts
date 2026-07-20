import { describe, it, expect } from "vitest";
import {
  normalizeUrl,
  validateUrlSafety,
  validateAndNormalizeUrl,
  isPublicIpAddress,
  UrlValidationError,
} from "@/lib/url-validation";

describe("normalizeUrl", () => {
  it("adds https:// to bare domains", () => {
    expect(normalizeUrl("example.com")).toBe("https://example.com");
  });

  it("adds https:// to domains with paths", () => {
    expect(normalizeUrl("example.com/products")).toBe(
      "https://example.com/products"
    );
  });

  it("preserves existing https protocol", () => {
    expect(normalizeUrl("https://example.com")).toBe("https://example.com");
  });

  it("preserves existing http protocol", () => {
    expect(normalizeUrl("http://example.com")).toBe("http://example.com");
  });

  it("trims whitespace", () => {
    expect(normalizeUrl("  example.com  ")).toBe("https://example.com");
  });

  it("preserves www subdomain", () => {
    expect(normalizeUrl("www.example.com")).toBe("https://www.example.com");
  });

  it("preserves deep paths and query strings", () => {
    expect(normalizeUrl("example.com/path?q=1&b=2#hash")).toBe(
      "https://example.com/path?q=1&b=2#hash"
    );
  });

  it("rejects empty strings", () => {
    expect(() => normalizeUrl("")).toThrow(UrlValidationError);
  });

  it("rejects strings with only spaces", () => {
    expect(() => normalizeUrl("   ")).toThrow(UrlValidationError);
  });

  it("rejects javascript: URLs", () => {
    expect(() => normalizeUrl("javascript:alert(1)")).toThrow(
      UrlValidationError
    );
  });

  it("rejects file: URLs", () => {
    expect(() => normalizeUrl("file:///etc/passwd")).toThrow(
      UrlValidationError
    );
  });

  it("rejects data: URLs", () => {
    expect(() => normalizeUrl("data:text/html,<h1>hi</h1>")).toThrow(
      UrlValidationError
    );
  });

  it("rejects ftp: URLs", () => {
    expect(() => normalizeUrl("ftp://example.com")).toThrow(UrlValidationError);
  });
});

describe("validateUrlSafety", () => {
  it("allows valid HTTPS URLs", () => {
    const url = validateUrlSafety("https://example.com");
    expect(url.hostname).toBe("example.com");
  });

  it("allows valid HTTP URLs", () => {
    const url = validateUrlSafety("http://example.com");
    expect(url.hostname).toBe("example.com");
  });

  it("blocks localhost", () => {
    expect(() => validateUrlSafety("http://localhost")).toThrow(
      UrlValidationError
    );
    expect(() => validateUrlSafety("http://localhost:3000")).toThrow(
      UrlValidationError
    );
  });

  it("blocks 127.0.0.1", () => {
    expect(() => validateUrlSafety("http://127.0.0.1")).toThrow(
      UrlValidationError
    );
  });

  it("blocks 0.0.0.0", () => {
    expect(() => validateUrlSafety("http://0.0.0.0")).toThrow(
      UrlValidationError
    );
  });

  it("blocks ::1 IPv6 loopback", () => {
    expect(() => validateUrlSafety("http://[::1]")).toThrow(
      UrlValidationError
    );
  });

  it("blocks private 10.x.x.x range", () => {
    expect(() => validateUrlSafety("http://10.0.0.1")).toThrow(
      UrlValidationError
    );
    expect(() => validateUrlSafety("http://10.255.255.255")).toThrow(
      UrlValidationError
    );
  });

  it("blocks private 172.16-31.x.x range", () => {
    expect(() => validateUrlSafety("http://172.16.0.1")).toThrow(
      UrlValidationError
    );
    expect(() => validateUrlSafety("http://172.31.255.255")).toThrow(
      UrlValidationError
    );
  });

  it("blocks private 192.168.x.x range", () => {
    expect(() => validateUrlSafety("http://192.168.1.1")).toThrow(
      UrlValidationError
    );
  });

  it("blocks link-local 169.254.x.x", () => {
    expect(() => validateUrlSafety("http://169.254.169.254")).toThrow(
      UrlValidationError
    );
  });

  it("blocks cloud metadata endpoint", () => {
    expect(() =>
      validateUrlSafety("http://169.254.169.254/latest/meta-data/")
    ).toThrow(UrlValidationError);
  });

  it("blocks .local domains", () => {
    expect(() => validateUrlSafety("http://myapp.local")).toThrow(
      UrlValidationError
    );
  });

  it("blocks .internal domains", () => {
    expect(() => validateUrlSafety("http://service.internal")).toThrow(
      UrlValidationError
    );
  });

  it("blocks metadata hostnames", () => {
    expect(() =>
      validateUrlSafety("http://metadata.google.internal")
    ).toThrow(UrlValidationError);
  });

  it("rejects ftp: protocol", () => {
    expect(() => validateUrlSafety("ftp://example.com")).toThrow(
      UrlValidationError
    );
  });

  it("rejects file: protocol", () => {
    expect(() => validateUrlSafety("file:///etc/passwd")).toThrow(
      UrlValidationError
    );
  });
});

describe("validateAndNormalizeUrl", () => {
  it("normalizes and validates in one step", () => {
    const url = validateAndNormalizeUrl("example.com");
    expect(url.href).toBe("https://example.com/");
  });

  it("rejects private addresses from bare input", () => {
    expect(() => validateAndNormalizeUrl("localhost")).toThrow(
      UrlValidationError
    );
  });

  it("rejects private IPs from bare input", () => {
    expect(() => validateAndNormalizeUrl("192.168.1.1")).toThrow(
      UrlValidationError
    );
  });
});

describe("isPublicIpAddress", () => {
  it("returns true for public IPs", () => {
    expect(isPublicIpAddress("8.8.8.8")).toBe(true);
    expect(isPublicIpAddress("1.1.1.1")).toBe(true);
    expect(isPublicIpAddress("203.0.113.1")).toBe(true);
  });

  it("returns false for loopback", () => {
    expect(isPublicIpAddress("127.0.0.1")).toBe(false);
  });

  it("returns false for private 10.x", () => {
    expect(isPublicIpAddress("10.0.0.1")).toBe(false);
  });

  it("returns false for private 172.16-31.x", () => {
    expect(isPublicIpAddress("172.16.0.1")).toBe(false);
    expect(isPublicIpAddress("172.31.255.255")).toBe(false);
  });

  it("returns false for private 192.168.x", () => {
    expect(isPublicIpAddress("192.168.1.1")).toBe(false);
  });

  it("returns false for link-local", () => {
    expect(isPublicIpAddress("169.254.0.1")).toBe(false);
  });

  it("returns false for carrier-grade NAT", () => {
    expect(isPublicIpAddress("100.64.0.1")).toBe(false);
    expect(isPublicIpAddress("100.127.255.255")).toBe(false);
  });

  it("returns false for invalid inputs", () => {
    expect(isPublicIpAddress("not-an-ip")).toBe(false);
    expect(isPublicIpAddress("256.1.1.1")).toBe(false);
    expect(isPublicIpAddress("1.2.3")).toBe(false);
  });
});
