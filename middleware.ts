import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up', '/about', '/api/auth/login', '/api/auth/register'];
const AUTH_PAGES = ['/sign-in', '/sign-up'];
const PRIVATE_PATHS = ['/profile', '/notes'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPage = AUTH_PAGES.some(path => pathname.startsWith(path));
  const isPrivateRoute = PRIVATE_PATHS.some((path) => pathname.startsWith(path));

  if (isPrivateRoute && !accessToken) {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/api/auth/refresh', req.url));
    }

    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};