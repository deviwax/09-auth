import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import NoteClient from '../filter/[...slug]/Notes.client';
import { fetchNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

interface PageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  const note = queryClient.getQueryData<Note>(['note', params.id]);

  if (!note) {
    notFound();
  }

  return <NoteClient dehydratedState={dehydrate(queryClient)} tag={note.tag} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  if (!note) {
    return {
      title: 'Note not found - NoteHub',
      description: 'The requested note does not exist.',
      openGraph: {
        title: 'Note not found - NoteHub',
        description: 'The requested note does not exist.',
        url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${params.id}`,
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
      url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${params.id}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}