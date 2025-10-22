'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

export default function NoteForm({ onClose, action }: { onClose: () => void; action: (formData: FormData) => Promise<void> }) {
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const router = useRouter();

  const [formData, setFormData] = useState(draft);

  useEffect(() => {
    setFormData(draft);
  }, [draft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      setDraft(updated);
      return updated;
    });
  };

  const handleSubmitSuccess = () => {
    clearDraft();
    onClose();
  };

  return (
    <form
      className={css.form}
      action={async (formData: FormData) => {
        await action(formData);
        handleSubmitSuccess();
      }}
    >
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
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
