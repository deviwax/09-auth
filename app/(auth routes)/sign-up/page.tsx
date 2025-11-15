'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import { RegisterRequest } from '@/types/user';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

import css from './SignUpPage.module.css';

export type ApiError = AxiosError;

interface ErrorResponse {
  error?: string;
  message?: string;
}

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser)


  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as unknown as RegisterRequest;
      const res = await register(formValues);
      if (res) {
	      setUser(res)
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
  ((error as ApiError).response?.data as ErrorResponse)?.error ??
  ((error as ApiError).response?.data as ErrorResponse)?.message ??
  (error as ApiError).message ??
  'Oops... some error'
)
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}>
        <label className={css.formGroup}>
          Username
          <input className={css.input} type="text" name="userName" required />
        </label>
        <label className={css.formGroup}>
          Email
          <input className={css.input} type="email" name="email" required />
        </label>
        <label className={css.formGroup}>
          Password
          <input className={css.input} type="password" name="password" required />
        </label>
        <div className={css.actions}>
        <button className={css.submitButton} type="submit">Register</button>
        </div>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
};

export default SignUp;