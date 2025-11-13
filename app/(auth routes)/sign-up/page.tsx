'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import type { RegisterRequest } from '@/types/user';
import { AxiosError } from 'axios';
import type { User } from '@/types/user';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formValues: RegisterRequest = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const user: User = await register(formValues);
    console.log('Registered user:', user);
    router.push('/profile');
  } catch (error: unknown) {
    let message = 'Registration failed';
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || error.message;
    }
    setError(message);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" name="email" required />
      </label>
      <label>
        Password
        <input type="password" name="password" required minLength={6} />
      </label>
      <button type="submit">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}