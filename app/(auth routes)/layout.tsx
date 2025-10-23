import React, { ReactNode } from 'react';
import styles from './sign-in/SignInPage.module.css';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}
