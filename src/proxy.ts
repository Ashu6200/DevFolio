import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/about', '/projects', '/contact', '/blogs'];
const AUTH_PATHS = ['/sign-in', '/sign-up'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Public routes — always allow
  if (PUBLIC_PATHS.some((p) => pathname === p)) {
    return NextResponse.next();
  }

  // Check for better-auth session cookie
  const sessionCookie =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('__Secure-better-auth.session_token');
  const isAuthenticated = !!sessionCookie;

  // Auth pages — redirect to dashboard if already authenticated
  if (AUTH_PATHS.some((p) => pathname.startsWith(p))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Dashboard routes — redirect to sign-in if not authenticated
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
