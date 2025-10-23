import { api } from './api';

export const fetchNotes = async (params?: { search?: string; page?: number; tag?: string }) => {
  const { data } = await api.get('/api/v1/notes', { params: { ...params, perPage: 12 } });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/api/v1/notes/${id}`);
  return data;
};

export const createNote = async (note: { title: string; content: string; tag: string }) => {
  const { data } = await api.post('/api/v1/notes', note);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/api/v1/notes/${id}`);
  return data;
};

export const register = async (email: string, password: string) => {
  const { data } = await api.post('/api/v1/auth/register', { email, password });
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/api/v1/auth/login', { email, password });
  return data;
};

export const logout = async () => {
  await api.post('/api/v1/auth/logout');
};

export const checkSession = async () => {
  const { data } = await api.get('/api/v1/auth/session');
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/api/v1/users/me');
  return data;
};

export const updateMe = async (user: { username: string }) => {
  const { data } = await api.patch('/api/v1/users/me', user);
  return data;
};
