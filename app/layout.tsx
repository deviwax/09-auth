import './globals.css';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import AuthProvider from '../components/AuthProvider/AuthProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import css from '@/components/LayoutNotes/LayoutNotes.module.css';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';

const SITE_URL = 'https://notehub.goit.global';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub - Your notes app',
  description: 'NoteHub - Keep your notes organized and accessible',
  openGraph: {
    title: 'NoteHub - Your notes app',
    description: 'NoteHub - Keep your notes organized and accessible',
    url: SITE_URL,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <div className={css.container}>
              <Header />
              <main className={css.main}>
                {children}
                {modal}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
