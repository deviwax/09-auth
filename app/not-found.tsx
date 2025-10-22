import css from './page.module.css';
import type { Metadata } from 'next';

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}

export const metadata: Metadata = {
  title: 'NoteHub - Page Not Found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: 'NoteHub - Page Not Found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://your-site-url.com/not-found',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};