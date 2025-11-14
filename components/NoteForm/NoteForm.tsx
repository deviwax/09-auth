'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { Note, DraftNote} from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
  action?: (formData: FormData) => Promise<void>;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<DraftNote>(draft);

  useEffect(() => {
    setFormData(draft);
  }, [draft]);

  const mutation = useMutation<Note, Error, DraftNote>({
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
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  useEffect(() => {
  setFormData((prev) => {
    if (
      prev.title === draft.title &&
      prev.content === draft.content &&
      prev.tag === draft.tag
    ) {
      return prev;
    }
    return draft;
  });
}, [draft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input className={css.input}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea className={css.textarea}
          name="content"
          value={formData.content}
          onChange={handleChange}
          maxLength={500}
        />
      </label>

      <label className={css.formGroup}>
        Tag
        <select className={css.select} name="tag" value={formData.tag} onChange={handleChange} required>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.actions}>
        <button className={css.submitButton} type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save'}
        </button>
        <button className={css.cancelButton} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>

      {mutation.isError && (
        <p className={css.error}>Error: {(mutation.error as Error).message}</p>
      )}

      {mutation.isSuccess && <p>Note created successfully!</p>}
    </form>
  );
}