export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
}

export interface UpdateUserRequest {
  username: string;
  avatar: string;
};