import { notFound } from 'next/navigation';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';
import type { Note } from '@/types/note';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const note = queryClient.getQueryData<Note>(['note', id]);
  if (!note) notFound();

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) {
    return {
      title: 'Note not found - NoteHub',
      description: 'The requested note does not exist.',
      openGraph: {
        title: 'Note not found - NoteHub',
        description: 'The requested note does not exist.',
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  }

  return {
    title: `NoteHub - ${note.title}`,
    description: note.content?.slice(0, 160) || 'Note details',
    openGraph: {
      title: `NoteHub - ${note.title}`,
      description: note.content?.slice(0, 160) || 'Note details',
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}