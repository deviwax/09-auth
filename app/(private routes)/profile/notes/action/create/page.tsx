import CreateNoteClient from './CreateNoteClient';
import { createNoteAction } from '../action';
import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: 'NoteHub - Create Note',
  description: 'Create a new note in NoteHub',
  openGraph: {
    title: 'NoteHub - Create Note',
    description: 'Create a new note in NoteHub',
    url: `${API_URL}/notes/action/create`,
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  }],
  },
};

export default function CreateNotePage() {
  return <CreateNoteClient action={createNoteAction} />;
}
