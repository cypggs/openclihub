import { NextRequest, NextResponse } from "next/server";

/**
 * Verify API key for write operations.
 * The API key is set via OPENCLIHUB_API_KEY environment variable.
 *
 * Usage:
 *   curl -X POST /api/tools \
 *     -H "Authorization: Bearer YOUR_API_KEY" \
 *     -H "Content-Type: application/json" \
 *     -d '{"name": "..."}'
 */
export function requireAuth(
  request: NextRequest
): NextResponse | null {
  const apiKey = process.env.OPENCLIHUB_API_KEY;

  // If no API key is configured, reject all write requests
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfigured: API key not set" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Missing Authorization header. Use: Authorization: Bearer YOUR_API_KEY" },
      { status: 401 }
    );
  }

  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (token !== apiKey) {
    return NextResponse.json(
      { error: "Invalid API key" },
      { status: 403 }
    );
  }

  // Auth passed
  return null;
}
