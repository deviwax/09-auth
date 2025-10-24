'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api/api';
import NoteItem from '../NoteItem/NoteItem';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      mutate(id);
    }
  };

  if (!notes || notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}