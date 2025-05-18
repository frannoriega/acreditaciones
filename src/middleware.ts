// middleware.ts
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { middlewareConfig } from "./auth.config";

export default NextAuth(middlewareConfig).auth((req) => {
  const isAuthRoute = req.nextUrl.pathname === "/";
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");

  if (isAuthRoute || isApiAuthRoute) {
    return NextResponse.next();
  }


  if (!req.auth) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
