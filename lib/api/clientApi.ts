import { nextServer } from './api';
import type { User, UpdateUserRequest } from '@/types/user';
import type { Note } from '@/types/note'; 

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export async function createNote(noteData: Partial<Note>): Promise<Note> {
  const { data } = await nextServer.post('/notes', noteData);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete(`/notes/${id}`);
  return data;
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
  const { data } = await nextServer.get(`/notes/${id}`, {
    withCredentials: true
  });
  return data;
}

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me', {
    withCredentials: true
  });
  return data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload, {
    withCredentials: true
  });
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session', {
    withCredentials: true
  });
  return res.data.success;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data, {
    withCredentials: true
  });
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout', {
    withCredentials: true
  })
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data, {
    withCredentials: true
  });
  return res.data;
};