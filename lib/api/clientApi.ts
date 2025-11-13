import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { api } from './axios';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function createNote(noteData: Partial<Note>): Promise<Note> {
  const { data } = await api.post('/notes', noteData);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function updateMe(userData: { username: string }): Promise<User> {
  const { data } = await api.patch('/users/me', userData);
  return data;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function register(name: string, email: string, password: string): Promise<User> {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
}

export async function fetchNotes(params: { page: number; search: string; tag: string }): Promise<NotesResponse> {
  const { data } = await api.get('/notes', {
    params: { page: params.page, search: params.search, tag: params.tag, perPage: 12 },
  });
  return data;
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
