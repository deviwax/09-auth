import React from 'react';

interface NotesFilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function NotesFilterLayout({ children, sidebar }: NotesFilterLayoutProps) {
  return (
    <div style={{ display: 'flex' }}>

      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}