import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("sarhisob_role")?.value;

  if (pathname.startsWith("/workspace") && role !== "student") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && role !== "teacher") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((pathname === "/login" || pathname === "/register") && role) {
    return NextResponse.redirect(
      new URL(role === "teacher" ? "/admin" : "/workspace", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/workspace/:path*", "/admin/:path*", "/login", "/register"],
};
