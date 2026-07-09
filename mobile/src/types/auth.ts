export type AuthResponse = {
  userId: string;
  fullName: string;
  email: string;
  accessToken: string;
  totalXp: number;
  level: number;
};

export type CurrentUser = {
  userId: string;
  fullName: string;
  email: string;
  totalXp: number;
  level: number;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};