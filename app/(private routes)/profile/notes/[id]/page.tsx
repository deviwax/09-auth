import { fetchNoteById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function NoteDetailsPage({ params }: { params: { id: string } }) {
  const note = await fetchNoteById(params.id);

  if (!note) return notFound();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>
        <strong>Tag:</strong> {note.tag}
      </p>
    </main>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  if (!note) {
    return {
      title: 'Note not found - NoteHub',
      description: 'The requested note does not exist.',
      openGraph: {
        title: 'Note not found - NoteHub',
        description: 'The requested note does not exist.',
        url: `${API_URL}/notes/${params.id}`,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  }

  return {
    title: `NoteHub - ${note.title}`,
    description: note.content?.slice(0, 160) || 'Note detail',
    openGraph: {
      title: `NoteHub - ${note.title}`,
      description: note.content?.slice(0, 160) || 'Note detail',
      url: `${API_URL}/notes/${params.id}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}
