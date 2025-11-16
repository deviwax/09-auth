'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes, NotesResponse } from '@/lib/api';
import { useState, useEffect } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import { Note } from '@/types/note';

export default function NotesClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery<NotesResponse, Error>({
    queryKey: ['notes', currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage, debouncedSearch),
      refetchOnMount: false,
      placeholderData: keepPreviousData,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong: {(error as Error).message}</p>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <SearchBox onSearch={setSearchQuery} />
        <button onClick={openModal}>+ Add Note</button>
      </div>

          <NoteList notes={notes} />
          
          {totalPages > 1 && (
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
              />
          )}
          {isModalOpen && (
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                  <NoteForm onClose={closeModal} />
              </Modal>
          )}
    </>
  );
}