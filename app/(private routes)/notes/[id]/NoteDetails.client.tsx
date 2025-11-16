'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';
import styles from './NoteDetails.module.css';
import { useState, useEffect } from 'react';

interface Props {
    id: string;
}

export default function NoteDetailsClient({ id }: Props) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (note?.createdAt) {
      const date = new Date(note.createdAt);
      setFormattedDate(date.toLocaleString());
    }
  }, [note]);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={styles.noteDetails}>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>Date: {formattedDate ?? 'Loading date...'}</p>
    </div>
  );
}