'use server';

import { revalidatePath } from 'next/cache';
import { createNote } from '@/lib/api/api';

export async function createNoteAction(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    tag: formData.get('tag') as string,
  };
    
  await createNote(data);
  revalidatePath('/notes');
}