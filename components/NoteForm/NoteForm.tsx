'use client';

import { useNoteStore } from '@/lib/store/noteStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { DraftNote } from '@/types/note';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: DraftNote) => createNote(newNote),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input 
          className={css.input}
          type="text"
          name="title"
          value={draft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea 
          className={css.textarea}
          name="content"
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </label>

      <label className={css.formGroup}>
        Tag
        <select 
          className={css.select} 
          name="tag" 
          value={draft.tag} 
          onChange={handleChange} 
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.actions}>
        <button 
          className={css.submitButton} 
          type="submit" 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Save'}
        </button>
        <button 
          className={css.cancelButton} 
          type="button" 
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>

      {mutation.isError && (
        <p className={css.error}>Error: {(mutation.error as Error).message}</p>
      )}
    </form>
  );
}