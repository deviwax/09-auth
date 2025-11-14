export interface User {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
}