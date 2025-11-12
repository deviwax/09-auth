'use client';

import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.headerLink}>
        <Link href="/">NoteHub</Link>
      </div>
      <nav className={css.navigation}>
        <Link href="/" className={css.navigationLink}>Home</Link>
        <TagsMenu />
        <div className={css.navigationItem}>
          <Link href="/sign-in" className={css.navigationLink}>Login</Link>
          <Link href="/sign-up" className={css.navigationLink}>Sign up</Link>
        </div>
      </nav>
    </header>
  );
}
