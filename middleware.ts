import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up', '/about', '/api/auth/login', '/api/auth/register'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
