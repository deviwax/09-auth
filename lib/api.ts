import axios from 'axios';
import { Note } from '@/types/note';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(page: number = 1, search: string = ''): Promise<NotesResponse> {
  const response = await axios.get<NotesResponse>(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, search },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
    try {
        const response = await axios.post<Note>(`${API_URL}/notes`, newNote, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to create note:', error);
        throw error;
    }
}

export async function deleteNote(id: string): Promise<Note> {
        const response = await axios.delete<Note>(`${API_URL}/notes/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
}

const nextServer = axios.create({
  baseURL: 'http://localhost:3006/api',
  withCredentials: true,
});

export const getNotes = async (categoryId?: string) => {
  const res = await nextServer.get<NotesResponse>('/notes', {
    params: { categoryId },
  });
  return res.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};
