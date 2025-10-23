'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/app/api/clientApi';
import css from './ProfilePage.module.css';

export default function ProfilePage() {
  const { data: user, isLoading } = useQuery({
  queryKey: ['me'],
  queryFn: getMe,
});

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src={user?.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
