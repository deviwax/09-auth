'use client'

import { useEffect, useState } from 'react';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import { getMe, updateMe, uploadImage } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

const EditProfile = () => {
  const [userName, setUserName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

	useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setPhotoUrl(user.avatar ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newPhotoUrl = imageFile ? await uploadImage(imageFile) : '';
      await updateMe({ userName, photoUrl: newPhotoUrl });
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };

  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <img src="avatar"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
        />
      </div>

      <p>Email: user_email@example.com</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
  )
}

export default EditProfile;