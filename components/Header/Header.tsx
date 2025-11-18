'use client';

import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">NoteHub</Link>
      <nav aria-label="Main Navigation" className={css.navigationItem}>
        <ul className={css.navigation}>
          <li className={css.navigationItem}><TagsMenu />
          </li>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/profile">Profile</Link>
          </li>
          <li className={css.navigationLink}>
            <AuthNavigation />
          </li>
        </ul>
      </nav>
    </header>
  );
}