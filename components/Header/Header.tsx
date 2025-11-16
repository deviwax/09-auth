import css from './Header.module.css';
import Link from 'next/link';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = () => {
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">NoteHub</Link>
      <nav aria-label="Main Navigation" className={css.navigationItem}>
        <ul className={css.navigation}>
          <li className={css.navigationLink}><CategoriesMenu />
          </li>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/profile">Profile</Link>
          </li>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/about">About</Link>
          </li>
          <li className={css.navigationLink}>
            <AuthNavigation />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;