import Link from 'next/link';
import css from './Sidebar.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function Sidebar() {

  return (
    <nav className={css.sidebarNav}>
      <ul className={css.menuList}>
        {tags.map(tag => {
          const href = `/notes/filter/${tag}`;

          return (
            <li key={tag} className={css.menuItem}>
              <Link href={href} className={`${css.menuLink}`}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
