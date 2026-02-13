import apiClient from "./client";
import type {
  ApiResponse,
  UserMeResponse,
  PublicProfile,
  UpdateUserPayload,
} from "./types";

export const usersApi = {
  getMe: () =>
    apiClient.get<ApiResponse<UserMeResponse>>("/users/me").then((r) => r.data),

  updateMe: (data: UpdateUserPayload) =>
    apiClient
      .patch<ApiResponse<UserMeResponse>>("/users/me", data)
      .then((r) => r.data),

  getPublicProfile: (userId: string) =>
    apiClient
      .get<ApiResponse<PublicProfile>>(`/users/${userId}`)
      .then((r) => r.data),
};
