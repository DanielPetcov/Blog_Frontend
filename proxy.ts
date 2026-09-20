import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Fixtures make the dashboard independently reviewable before the API exists.
  // Once the real endpoint is enabled, the existing token becomes mandatory.
  if (process.env.USE_DUMMY_ADMIN_DATA !== "false") {
    return NextResponse.next();
  }

  if (!request.cookies.has("access_token")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
