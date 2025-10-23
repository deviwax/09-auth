import { NextResponse } from 'next/server';

export async function GET() {
  const user = { email: 'test@example.com', username: 'TestUser' };

  return NextResponse.json({ user });
}
