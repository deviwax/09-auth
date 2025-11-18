'use client';

import Link from 'next/link';
import css from './TagsMenu.module.css';
import { useState, useRef, useEffect } from 'react';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className={css.menuContainer} ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>

      {isOpen && (
        <ul
          className={css.menuList}>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem} style={{ padding: '0 1rem', cursor: 'pointer' }}>
              <Link href={tag === 'All' ? '/notes/filter/All' : `/notes/filter/${tag}`} className={css.menuLink} onClick={() => setIsOpen(false)}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}