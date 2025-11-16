'use client';

import Link from 'next/link';
import { Note } from '@/types/note';
import styles from '../NoteList/NoteList.module.css';

interface Props {
  note: Note;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function NoteItem({ note, onDelete, isDeleting }: Props) {
  return (
    <div className={styles.listItem}>
      <h3 className={styles.title}>{note.title}</h3>
      <p className={styles.content}>{note.content}</p>
      {note.tag && <span className={styles.tag}>{note.tag}</span>}

      <div className={styles.footer}>
        <Link href={`/notes/${note.id}`} className={styles.link}>
          View details
        </Link>
        <button
          onClick={() => onDelete(note.id)}
          disabled={isDeleting}
          className={styles.button}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}