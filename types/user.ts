export interface User {
  email: string;
  username: string;
  avatar: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}