import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email === 'test@example.com' && password === 'password123') {

    return NextResponse.json({ message: 'Login successful', token: 'fake-jwt-token' });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
