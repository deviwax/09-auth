import axios from 'axios';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function updateMe(userData: { username: string }): Promise<User> {
  const { data } = await axios.patch(`${BASE_URL}/users/me`, userData);
  return data;
}

export async function login(email: string, password: string): Promise<User> {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return data;
}

export async function register(email: string, password: string): Promise<User> {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, { email, password });
  return data;
}

export async function fetchNotes(params: { page: number; search: string; tag: string }): Promise<NotesResponse> {
  const { data } = await axios.get(`${BASE_URL}/notes`, {
    params: { page: params.page, search: params.search, tag: params.tag, perPage: 12 },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get(`${BASE_URL}/notes/${id}`);
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await axios.get(`${BASE_URL}/users/me`);
  return data;
}

export async function checkSession(): Promise<User | null> {
  try {
    const { data } = await axios.get(`${BASE_URL}/auth/session`);
    return data;
  } catch {
    return null;
  }
}