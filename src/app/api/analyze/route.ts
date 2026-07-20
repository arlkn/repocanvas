import { NextResponse } from "next/server";

/**
 * POST /api/analyze
 *
 * This is a Phase 1 stub. The full analysis pipeline
 * will be implemented in Phase 3+.
 *
 * Expected body: { url: string }
 * Returns: { id: string, status: "pending" }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required", code: "INVALID_URL" },
        { status: 400 }
      );
    }

    // Validate URL format
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format", code: "INVALID_URL" },
        { status: 400 }
      );
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return NextResponse.json(
        { error: "Only HTTP and HTTPS URLs are supported", code: "UNSUPPORTED_PROTOCOL" },
        { status: 400 }
      );
    }

    // Stub: return a pending analysis ID
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);

    return NextResponse.json({
      id,
      url: parsed.href,
      status: "pending",
      message: "Analysis pipeline will be implemented in a future phase.",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
