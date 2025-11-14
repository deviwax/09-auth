import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'User profile page',
};

export default async function ProfilePage() {
  const user = await getServerMe();

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <h2>Username: {user.username}</h2>
          <h2>Email: {user.email}</h2>
        </div>
      </div>
    </main>
  );
}