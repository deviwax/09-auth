import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes', '/notes/filter'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkServerSession(cookieStore.toString());
      const setCookieHeader = data.headers['set-cookie'];

      const response = NextResponse.next();

      if (setCookieHeader) {
        const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
        for (const cookieStr of cookiesArray) {
  const parsed = parse(cookieStr);
  for (const [name, value] of Object.entries(parsed)) {
    if (typeof value === "string") {
      response.cookies.set({
        name,
        value,
        path: '/',
      });
    }
  }
}
      }

      if (isPublicRoute) {
        return NextResponse.redirect(new URL('/', request.url), {
          headers: response.headers,
        });
      }
      if (isPrivateRoute) {
        return response;
      }
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    if (isPublicRoute) {
      return NextResponse.next();
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/notes/filter/:path*', '/sign-in', '/sign-up'],
};