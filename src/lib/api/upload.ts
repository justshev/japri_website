import apiClient from "./client";
import type { ApiResponse, UploadResponse } from "./types";

export const uploadApi = {
  upload: (file: File, bucket = "products") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    return apiClient
      .post<ApiResponse<UploadResponse>>("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },

  delete: (path: string) =>
    apiClient
      .delete<ApiResponse>("/upload", { data: { path } })
      .then((r) => r.data),
};
