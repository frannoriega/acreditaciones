
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const middleware = NextAuth(authConfig).auth
 
export default middleware((req) => {
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  const reqHeaders = new Headers(req.headers)
  reqHeaders.set('x-url', req.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: reqHeaders
    }
  })
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
