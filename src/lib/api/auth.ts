import apiClient from "./client";
import type {
  ApiResponse,
  AuthResponse,
  RegisterPayload,
  LoginPayload,
  Session,
} from "./types";

export const authApi = {
  register: (data: RegisterPayload) =>
    apiClient
      .post<ApiResponse<AuthResponse>>("/auth/register", data)
      .then((r) => r.data),

  login: (data: LoginPayload) =>
    apiClient
      .post<ApiResponse<AuthResponse>>("/auth/login", data)
      .then((r) => r.data),

  logout: () => apiClient.post<ApiResponse>("/auth/logout").then((r) => r.data),

  refresh: (refreshToken: string) =>
    apiClient
      .post<ApiResponse<Session>>("/auth/refresh", { refreshToken })
      .then((r) => r.data),

  google: (idToken: string) =>
    apiClient
      .post<ApiResponse<AuthResponse>>("/auth/google", { idToken })
      .then((r) => r.data),
};
