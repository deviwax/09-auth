import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { parse } from 'cookie';
import { AxiosError as ApiError } from 'axios';

interface ErrorResponse {
  error?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const apiRes = await api.post('/auth/login', body);

    const res = NextResponse.json(apiRes.data);

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        if (parsed.accessToken) {
          res.cookies.set('accessToken', parsed.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
          });
        }

        if (parsed.refreshToken) {
          res.cookies.set('refreshToken', parsed.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
          });
        }
      }
      return res;
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  } catch (error) {
    return NextResponse.json(
      {
        error:
          ((error as ApiError).response?.data as ErrorResponse)?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status ?? 500 }
    );
  }
}
