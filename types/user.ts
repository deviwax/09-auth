export interface User {
  email: string;
  username: string;
  avatar: string;
}

export interface UpdateUserRequest {
username: string;
avatar: string;
};