import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;
  const pathname = req.nextUrl.pathname;

  const isAuthRoute = pathname.startsWith("/login");

  const protectedPaths = [
    "/dashboard",
    "/categories",
    "/products",
    "/inventory",
    "/suppliers",
    "/users",
    "/settings",
  ];

  const isProtectedRoute = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/categories/:path*",
    "/products/:path*",
    "/inventory/:path*",
    "/suppliers/:path*",
    "/users/:path*",
    "/settings/:path*",
    "/dashboard/:path*",
    "/login",
  ],
};
