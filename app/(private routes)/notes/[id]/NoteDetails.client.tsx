'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function NoteDetails() {
  const params = useParams();
  const id = params?.id;
  const [note, setNote] = useState<{ id: string; title: string; content: string } | null>(null);

  useEffect(() => {
    async function fetchNote() {
      const res = await fetch(`/api/notes/${id}`);
      const data = await res.json();
      setNote(data);
    }

    if (id) fetchNote();
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
