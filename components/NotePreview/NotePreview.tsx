'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import css from './NotePreview.module.css';
import type { Note } from '@/types/note';

interface NotePreviewProps {
  noteId: string;
}

async function fetchNote(id: string): Promise<Note> {
  const response = await axios.get(`/api/notes/${id}`);
  return response.data;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
    const {
        data: note,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['note', noteId], 
        queryFn: () => fetchNote(noteId),
    });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Note not found.</p>;

  return (
    <div className={css.preview}>
      <h2>{note.title}</h2>
          <p>{note.content}</p>
    {note.tag && (
      <div className={css.tag}>
          <span className={css.tag}>
          </span>
        </div>
    )}
    </div>
  );
}