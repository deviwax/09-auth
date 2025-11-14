'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import { RegisterRequest } from '@/types/user';
import { AxiosError } from 'axios';
import css from './SignUpPage.module.css';

export type ApiError = AxiosError;

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
  try {
    const formValues = Object.fromEntries(formData) as unknown as RegisterRequest;

    const res = await register(formValues);

    if (res) {
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
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
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