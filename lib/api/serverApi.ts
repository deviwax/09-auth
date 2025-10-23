import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const fetchNotes = async (cookieHeader: string, params?: any) => {
  const response = await axios.get(baseURL + '/notes', {
    params: { ...params, perPage: 12 },
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const fetchNoteById = async (cookieHeader: string, id: string) => {
  const response = await axios.get(baseURL + `/notes/${id}`, {
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const getMe = async (cookieHeader: string) => {
  const response = await axios.get(baseURL + '/users/me', {
    headers: { cookie: cookieHeader },
  });
  return response.data;
};

export const checkSession = async (cookieHeader: string) => {
  const response = await axios.get(baseURL + '/auth/session', {
    headers: { cookie: cookieHeader },
  });
  return response.data;
};
