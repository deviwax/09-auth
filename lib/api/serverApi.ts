'use server'

import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export interface SessionData {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export async function checkServerSession(cookieHeader: string) {
  const response = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response;
}

export async function refreshSession(refreshToken: string): Promise<SessionData> {
  const response = await nextServer.post('/auth/refresh', { refreshToken }, { withCredentials: true });
  return response.data as SessionData;
}

export async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies.map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
}

export async function fetchNotes(
  params?: { page?: number; search?: string; tag?: string }
): Promise<{ notes: Note[]; totalPages: number }> {
  const response = await nextServer.get('/notes', {
    params: { ...params, perPage: 12 },
    withCredentials: true
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieHeader = await getCookieHeader();
  const response = await nextServer.get(`/notes/${id}`, {
    headers: { cookie: cookieHeader },
  });
  return response.data;
}

export async function getServerMe(): Promise<User> {
  const cookieHeader = await getCookieHeader();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
}
