'use client';

import React, { useState } from 'react';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignInPage.module.css';

export type ApiError = AxiosError;

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser)
  
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues.email, formValues.password);
      if (res) {
	      setUser(res)
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response &&
    error.response.data &&
    typeof error.response.data === 'object' &&
    'error' in error.response.data
  ) {
    setError((error.response.data as { error: string }).error);
  } else if (error instanceof Error) {
    setError(error.message);
  } else {
    setError('Oops... some error');
  }
}
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}>
      <h1 className={css.formTitle}>Sign in</h1>
      <label className={css.formGroup}>
        Email
        <input className={css.input} type="email" name="email" required />
      </label>
      <label className={css.formGroup}>
        Password
        <input className={css.input} type="password" name="password" required />
        </label>
        <div className={css.actions}>
        <button className={css.submitButton} type="submit">Log in</button>
        </div>
      {error && <p>{error}</p>}
    </form>
    </main>
  );
};