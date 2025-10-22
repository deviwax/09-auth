'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NoteModal({ id }: { id: string }) {
  const router = useRouter();

  const handleClose = () => router.back();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  });

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          minWidth: '300px',
        }}
      >
        <h2>Note ID: {id}</h2>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}
