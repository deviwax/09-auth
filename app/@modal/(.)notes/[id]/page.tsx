import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';
import type { Note } from '@/types/note';
import { fetchNoteById } from '@/lib/api/serverApi';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}