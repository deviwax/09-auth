'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import css from './CategoriesMenu.module.css';

interface Category {
  id: string;
  name: string;
}

const getCategories = async (): Promise<Category[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'Work' },
        { id: '2', name: 'Personal' },
        { id: '3', name: 'Hobby' }
      ])
    }, 500)
  })
}

const CategoriesMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  
  const toggle = () => setIsOpenMenu(!isOpenMenu);

 const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		getCategories().then((data: Category[]) => setCategories(data));
  }, []);
  
  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuBtn}>
        Notes
      </button>
      {isOpenMenu && (
        <ul className={css.menu}>
          <li className={css.menuItem}>
            <Link href={`/notes/filter/all`} onClick={toggle}>
              All notes
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id} className={css.menuItem}>
              <Link href={`/notes/filter/${category.id}`} onClick={toggle}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoriesMenu;
