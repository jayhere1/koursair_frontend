import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const strapiUrl = process.env.STRAPI_URL || "";

  response.headers.set(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${strapiUrl}`
  );

  return response;
}

export const config = {
  matcher: ["/tour/:path*"],
};
