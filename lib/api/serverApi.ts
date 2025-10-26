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

function getCookieHeader(): string {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  return allCookies.map(c => `${c.name}=${c.value}`).join('; ');
}

export const fetchNotes = async (
  params?: { page?: number; search?: string; tag?: string }
): Promise<{ notes: Note[]; totalPages: number }> => {
  const cookieHeader = getCookieHeader();
  const response = await api.get('/notes', {
    params: { ...params, perPage: 12 },
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = getCookieHeader();
  const response = await api.get(`/notes/${id}`, {
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = getCookieHeader();
  const response = await api.get('/users/me', {
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const cookieHeader = getCookieHeader();
  const response = await api.get('/auth/session', {
    headers: { cookie: cookieHeader },
  });
  return response;
};
