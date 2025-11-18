'use client';

import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm/NoteForm';

interface CreateNoteClientProps {
  action: (formData: FormData) => Promise<void>;
}

export default function CreateNoteClient({ action }: CreateNoteClientProps) {
  const router = useRouter();

  return (
    <NoteForm
    />
  );
}