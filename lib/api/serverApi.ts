import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import { api } from '@/lib/api/axios';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

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

export async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies.map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join('; ');
}