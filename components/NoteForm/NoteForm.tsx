'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api/api';
import css from './NoteForm.module.css';

export default function NoteForm({ onClose }: { onClose: () => void }) {
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(draft);

  useEffect(() => {
    setFormData(draft);
  }, [draft]);

  const mutation = useMutation({
    mutationFn: (newNote: typeof formData) => createNote(newNote),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      setDraft(updated);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </label>

      <label>
        Content
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          maxLength={500}
        />
      </label>

      <label>
        Tag
        <select name="tag" value={formData.tag} onChange={handleChange} required>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.buttons}>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>

      {mutation.isError && (
        <p className={css.error}>
          Error: {(mutation.error as Error).message}
        </p>
      )}

      {mutation.isSuccess && <p>Note created successfully!</p>}
    </form>
  );
}
