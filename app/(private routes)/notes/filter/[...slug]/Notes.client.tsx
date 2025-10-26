'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, NotesResponse } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';

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
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, error } = useQuery<NotesResponse, Error>({
    queryKey: ['notes', page, tag, debouncedSearch],
    queryFn: () => fetchNotes({ page, tag, search: debouncedSearch }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <SearchBox
        value={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <Link href="/notes/action/create">Create Note</Link>

      {data?.notes.length ? (
        <>
          <NoteList notes={data.notes} />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p>No notes found.</p>
      )}
    </>
  );
}