import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes, NotesResponse } from '@/lib/api/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

const SITE_URL = 'https://notehub.goit.global';

interface Props {
  params: { slug: string[] };
}

export default async function NotesPage({ params }: Props) {
    const { slug } = params;
    const tag = slug.length > 0 ? slug[0] : 'All';

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<NotesResponse>({
        queryKey: ['notes', 1, '', tag],
        queryFn: () => fetchNotes(1, '', tag),
    });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug.length ? params.slug[0] : 'All';

    return {
      title: `NoteHub - Notes Filtered by ${tag}`,
      description: `Viewing notes filtered by ${tag} tag`,
      openGraph: {
        title: `NoteHub - Notes Filtered by ${tag}`,
        description: `Viewing notes filtered by ${tag} tag`,
        url: `${SITE_URL}/notes/filter/${tag}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'
          },
        ],
      },
    };
  }
