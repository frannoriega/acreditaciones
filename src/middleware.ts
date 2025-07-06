// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = ["/api/auth", "/auth/verify-request"];
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const token = await getToken({ 
    req: request, 
    secret: process.env.AUTH_SECRET
  });

  if (!token) {
    // If not authenticated and trying to access protected routes, redirect to sign in
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }
    return NextResponse.next();
  }

  // User is authenticated, handle application status redirects
  const userEmail = token.email;
  
  if (!userEmail) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  // Handle root path for authenticated users
  if (pathname === "/") {
    const hasApplied = await checkUserApplicationStatus(userEmail);
    const redirectPath = hasApplied ? "/u" : "/nuevo";
    return NextResponse.redirect(new URL(redirectPath, request.nextUrl.origin));
  }

  // Check application status for specific routes
  if (pathname === "/nuevo" || pathname === "/u") {
    const hasApplied = await checkUserApplicationStatus(userEmail);
    
    if (pathname === "/nuevo" && hasApplied) {
      // User has applied, redirect to /u
      return NextResponse.redirect(new URL("/u", request.nextUrl.origin));
    }
    
    if (pathname === "/u" && !hasApplied) {
      // User hasn't applied, redirect to /nuevo
      return NextResponse.redirect(new URL("/nuevo", request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

/**
 * Check if a user has applied by querying the database
 * This is a simplified version - in production you might want to cache this
 */
async function checkUserApplicationStatus(email: string): Promise<boolean> {
  try {
    // Since middleware runs on the edge, we need to make an API call
    // to check the user's application status
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/user/application-status?email=${encodeURIComponent(email)}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.hasApplied;
    }
  } catch (error) {
    console.error('Error checking user application status:', error);
  }

  // Default to false if we can't determine status
  return false;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
