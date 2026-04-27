import { NextRequest, NextResponse } from 'next/server';

const ACTIVATION_PATH = process.env.ACTIVATION_PATH || '/activate';
const ACTIVATION_KEY = process.env.ACTIVATION_KEY;

const PUBLIC_PATHS = ['/', '/about', '/projects', '/contact', '/blogs'];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith(ACTIVATION_PATH)) {
    const providedKey = pathname.slice(ACTIVATION_PATH.length).replace(/^\//, '');

    if (ACTIVATION_KEY && providedKey === ACTIVATION_KEY) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.set('admin_unlocked', 'true', {
        path: '/',
        sameSite: 'strict',
      });
      return response;
    }

    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/sign-up') || pathname.startsWith('/sign-in')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/api/auth/sign-up')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (PUBLIC_PATHS.some((p) => pathname === p)) {
    return NextResponse.next();
  }

  const sessionCookie =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('__Secure-better-auth.session_token');
  const isAuthenticated = !!sessionCookie;

  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
