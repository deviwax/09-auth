'use client';

import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        <Link href="/">NoteHub</Link>
      </div>
      <nav className={css.nav}>
        <TagsMenu />
        <Link href="/about" className={css.navLink}>
          About
        </Link>
        <AuthNavigation />
      </nav>
    </header>
  );
}
