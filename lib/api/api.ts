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

export async function fetchNotes(
  page: number = 1,
  search: string = '',
  tag: string
): Promise<NotesResponse> {
  const params: Record<string, string | number> = { page };

  if (search) params.search = search;
  if (tag && tag !== 'All') params.tag = tag;

  const response = await axios.get<NotesResponse>(`${API_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
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