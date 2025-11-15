import { NextResponse } from 'next/server';
import { api } from '../../api';

export async function POST() {
  try {
    const apiRes = await api.post('/auth/logout');

    const res = NextResponse.json(apiRes.data);

    res.cookies.set('accessToken', '', {
      maxAge: 0,
      path: '/',
    });

    res.cookies.set('refreshToken', '', {
      maxAge: 0,
      path: '/',
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}