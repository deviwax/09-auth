import { cookies } from 'next/headers';
import { api } from '@/lib/api/axios';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { AxiosResponse } from 'axios';

export interface SessionData {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export async function refreshSession(refreshToken: string): Promise<SessionData> {
  const response = await api.post('/auth/refresh', { refreshToken }, { withCredentials: true });
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
  const cookieHeader = await getCookieHeader();
  const response = await api.get('/notes', {
    params: { ...params, perPage: 12 },
    headers: { cookie: cookieHeader },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieHeader = await getCookieHeader();
  const response = await api.get(`/notes/${id}`, {
    headers: { cookie: cookieHeader },
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieHeader = await getCookieHeader();
  const response = await api.get('/users/me', {
    headers: { cookie: cookieHeader },
  });
  return response.data;
}

export async function checkSession(): Promise<AxiosResponse<User>> {
  const cookieHeader = await getCookieHeader();
  const response = await api.get('/auth/session', {
    headers: { cookie: cookieHeader },
  });
  return response;
}