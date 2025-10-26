import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { refreshSession } from './lib/api/serverApi';

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up', '/about', '/api/auth/login', '/api/auth/register'];
const AUTH_PAGES = ['/sign-in', '/sign-up'];
const PRIVATE_PATHS = ['/profile', '/notes'];

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const pathname = req.nextUrl.pathname;

  const isAuthPage = AUTH_PAGES.some(path => pathname.startsWith(path));
  const isPrivateRoute = PRIVATE_PATHS.some(path => pathname.startsWith(path));

  if (isPrivateRoute && !accessToken) {
    if (refreshToken) {
      try {
        const refreshed = await refreshSession(refreshToken);

        if (refreshed?.accessToken) {
          const response = NextResponse.redirect(req.url);
          response.cookies.set('accessToken', refreshed.accessToken, {
            httpOnly: true,
            path: '/',
          });
          return response;
        }
      } catch (err) {
        console.error('Failed to refresh session:', err);
      }
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
