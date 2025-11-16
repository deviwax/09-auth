import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

export class ApiError extends Error {
  response?: {
    status: number;
    data: any;
  };

  constructor(message: string, response?: { status: number; data: any }) {
    super(message);
    this.response = response;
  }

  get status(): number | undefined {
    return this.response?.status;
  }
}