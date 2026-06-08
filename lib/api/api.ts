import axios from 'axios';

//const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextServer = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});