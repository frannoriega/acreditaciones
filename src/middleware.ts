// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/api/auth", "/auth/verify-request"];
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  if (!token) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  // User is authenticated, handle application status redirects
  const userEmail = token.email;
  
  if (!userEmail) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  // Check if user is trying to access /nuevo
  if (pathname === "/nuevo") {
    // For now, allow access to /nuevo
    // We'll handle the redirect logic in the page component
    console.log(`User ${userEmail} accessing /nuevo - allowing access`);
  }

  // Check if user is trying to access /u (main user dashboard)
  if (pathname === "/u") {
    // For now, always redirect to /nuevo if user hasn't applied
    // This is a temporary fix until we resolve the API call issue
    console.log(`User ${userEmail} accessing /u - redirecting to /nuevo`);
    return NextResponse.redirect(new URL("/nuevo", request.nextUrl.origin));
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

    console.log('API Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('API Response data:', data);
      return data.hasApplied;
    } else {
      console.log('API Response error:', await response.text());
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
