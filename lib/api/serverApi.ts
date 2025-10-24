import axios from 'axios';
import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
}

export const fetchNotes = async (params?: any) => {
  const cookieHeader = await getCookieHeader();
  const response = await axios.get(baseURL + '/notes', {
    params: { ...params, perPage: 12 },
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieHeader = await getCookieHeader();
  const response = await axios.get(baseURL + `/notes/${id}`, {
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const getMe = async () => {
  const cookieHeader = await getCookieHeader();
  const response = await axios.get(baseURL + '/users/me', {
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();
  const response = await axios.get(baseURL + '/auth/session', {
    headers: { cookie: cookieHeader },
  });
  return response;
};
