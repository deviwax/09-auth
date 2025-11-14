'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api/clientApi';
import { Note } from '@/types/note';
import css from './NoteList.module.css';
import Link from 'next/link';

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
        <div key={note.id} className={css.listItem}>
          <Link href={`/notes/${note.id}`}>
            <h3 className={css.title}>{note.title}</h3>
          </Link>
          <p className={css.content}>{note.content}</p>
          <small className={css.tag}>{note.tag}</small>
          <button className={css.button} onClick={() => handleDelete(note.id)} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ))}
    </div>
  );
}