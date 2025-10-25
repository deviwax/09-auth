'use client';

import React, { useState } from 'react';
import { HydrationBoundary, QueryClient, useQuery, DehydratedState } from '@tanstack/react-query';
import { fetchNotes, NotesResponse } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface NotesClientProps {
  tag: string;
  dehydratedState?: DehydratedState | null;
}

export default function NotesClient({ tag, dehydratedState }: NotesClientProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesList tag={tag} page={page} search={debouncedSearch} />
    </HydrationBoundary>
  );
}

interface NotesListProps {
  tag: string;
  page?: number;
  search?: string;
}

function NotesList({ tag, page = 1, search = '' }: NotesListProps) {
  const { data, isLoading, error } = useQuery<NotesResponse, Error>({
  queryKey: ['notes', tag, page, search],
  queryFn: () => fetchNotes({ page, search, tag }),
  placeholderData: (oldData) => oldData,
});


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <NoteList notes={data?.notes ?? []} />;
}
