'use client';

import React, { useState } from 'react';
import { HydrationBoundary, QueryClient, useQuery, DehydratedState } from '@tanstack/react-query';
import { fetchNotes, NotesResponse } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';

interface NotesClientProps {
  tag: string;
  dehydratedState: DehydratedState | null | undefined;
}

export default function NotesClient({ tag, dehydratedState }: NotesClientProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesList tag={tag} />
    </HydrationBoundary>
  );
}

function NotesList({ tag }: { tag: string }) {
  const { data, isLoading, error } = useQuery<NotesResponse, Error>({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <NoteList notes={data?.notes ?? []} />;
}
