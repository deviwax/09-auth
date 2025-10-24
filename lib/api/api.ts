import axios, { AxiosInstance } from 'axios';
import { Note } from '@/types/note';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
  page: number = 1,
  search: string = '',
  tag: string = ''
): Promise<NotesResponse> {
  const params: Record<string, string | number> = { page };
  if (search) params.search = search;
  if (tag && tag !== 'All') params.tag = tag;

  const response = await api.get<NotesResponse>('/notes', { params });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}
