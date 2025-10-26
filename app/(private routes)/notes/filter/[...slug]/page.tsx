import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';

interface PageProps {
  params: { slug?: string[] };
}

export default async function NotesFilterPage({ params }: PageProps) {
  const tag = params.slug?.[0] ?? '';
  const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tag, ''],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
