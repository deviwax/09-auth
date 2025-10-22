'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 300);
    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
          onChange={handleChange}
          className={css.input}
      placeholder="Search notes..."
    />
  );
}