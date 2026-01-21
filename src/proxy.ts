import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/landing",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/blogs"
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //  const token = request.cookies.get("token")?.value;

  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (pathname === "/register") {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
