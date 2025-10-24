'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Modal from '@/components/Modal/Modal';

interface NotePreviewProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        router.back();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router]);

  const closeModal = () => {
    router.back();
  };

  if (isLoading) {
    return <p>Loading note...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>Note data not available</p>;
  }

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <button onClick={closeModal} style={{ float: 'right' }}>
        Close
      </button>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      {data.tag && <span>{data.tag}</span>}
      <small>Created at: {new Date(data.createdAt).toLocaleString()}</small>
    </Modal>
  );
}