import { nextServer } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import { api } from './axios';

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.put<User>('/auth/me', payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await nextServer.post('/upload', formData);
  return data.url;
};

export async function getMe(): Promise<User> {
  const { data } = await api.get('/users/me');
  return data;
}

export async function createNote(noteData: Partial<Note>): Promise<Note> {
  const { data } = await api.post('/notes', noteData);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
}