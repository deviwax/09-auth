'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore, AuthStore} from '@/store/authStore';
import css from './AuthNavigation.module.css';

const AuthNavigation = () => {
  const isAuthenticated = useAuthStore((state: AuthStore) => state.isAuthenticated);
  const user = useAuthStore((state: AuthStore) => state.user);
  const clearIsAuthenticated = useAuthStore((state: AuthStore) => state.clearIsAuthenticated);

  const logoutHandler = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    clearIsAuthenticated();
    window.location.href = '/sign-in';
  };

  return (
    <ul className={css.navigationList}>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" className={css.navigationLink} prefetch={false}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={logoutHandler} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" className={css.navigationLink} prefetch={false}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" className={css.navigationLink} prefetch={false}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default AuthNavigation;
