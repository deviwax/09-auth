'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Sidebar.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <nav className={css.sidebarNav}>
      <ul className={css.menuList}>
        {tags.map(tag => {
          const href = `/notes/filter/${tag}`;
          const isActive = pathname === href;

          return (
            <li key={tag} className={css.menuItem}>
              <Link href={href} className={`${css.menuLink} ${isActive ? css.active : ''}`}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}