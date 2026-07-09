import { apiRequest } from "./httpClient";
import type {
  AuthResponse,
  CurrentUser,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export function register(request: RegisterRequest) {
  return apiRequest<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: request,
  });
}

export function login(request: LoginRequest) {
  return apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: request,
  });
}

export function getCurrentUser() {
  return apiRequest<CurrentUser>("/api/auth/me", {
    method: "GET",
    authorized: true,
  });
}