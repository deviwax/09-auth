'use client';

import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function CreateNoteClient({ action }: { action: (formData: FormData) => Promise<void> }) {
  const router = useRouter();

  return (
    <NoteForm
      onClose={() => router.back()}
      action={action}
    />
  );
}
