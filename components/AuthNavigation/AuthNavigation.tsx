'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/api';
import css from './AuthNavigation.module.css';

const AuthNavigation = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  return isAuthenticated ? (
    <ul className={css.navigationItem}>
      <li className={css.navigationLink}>
        <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  ) : (
    <ul className={css.navigationItem}>
      <li className={css.navigationLink}>
        <Link href="/sign-in">Login</Link>
      </li>
      <li className={css.navigationLink}>
        <Link href="/sign-up">Sign up</Link>
      </li>
    </ul>
  );
};

export default AuthNavigation;
