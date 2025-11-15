import type { Note } from '@/types/note';
import type { User, RegisterRequest } from '@/types/user';
import { api } from './axios';
import axios from 'axios';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export async function createNote(noteData: Partial<Note>): Promise<Note> {
  const { data } = await api.post('/notes', noteData);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/api/auth/logout');
}

export async function updateMe(userData: { username: string }): Promise<User> {
  const { data } = await api.patch('/users/me', userData);
  return data;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await axios.post('/api/auth/login', { email, password });
  return data;
}

export async function register({ email, password }: RegisterRequest): Promise<User> {
  const { data } = await axios.post('/api/auth/register', { email, password });
  return data;
}

export async function fetchNotes(
  params: { page: number; search: string; tag: string }
): Promise<NotesResponse> {
  try {
    const validTags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'];
    const tagParam = validTags.includes(params.tag) ? params.tag : undefined;

    const queryParams: Record<string, string | number> = {
      page: params.page,
      search: params.search,
      perPage: 12,
    };

    if (tagParam) {
      queryParams.tag = tagParam;
    }

    const { data } = await api.get('/notes', {
      params: queryParams,
    });

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Fetch notes failed:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get('/users/me');
  return data;
}

export async function checkSession(): Promise<User | null> {
  try {
    const { data } = await api.get('/auth/session');
    return data;
  } catch {
    return null;
  }
}
