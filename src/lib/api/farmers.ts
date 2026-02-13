import apiClient from "./client";
import type {
  ApiResponse,
  FarmerListResponse,
  FarmerDetail,
  FarmerReviewsResponse,
  FarmerServiceItem,
  CreateFarmerPayload,
} from "./types";

export interface FarmerListParams {
  search?: string;
  category?: string;
  region?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const farmersApi = {
  list: (params?: FarmerListParams) =>
    apiClient
      .get<ApiResponse<FarmerListResponse>>("/farmers", { params })
      .then((r) => r.data),

  getById: (id: string) =>
    apiClient
      .get<ApiResponse<FarmerDetail>>(`/farmers/${id}`)
      .then((r) => r.data),

  create: (data: CreateFarmerPayload) =>
    apiClient
      .post<ApiResponse<FarmerDetail>>("/farmers", data)
      .then((r) => r.data),

  update: (id: string, data: Partial<CreateFarmerPayload>) =>
    apiClient
      .patch<ApiResponse<FarmerDetail>>(`/farmers/${id}`, data)
      .then((r) => r.data),

  // Reviews
  getReviews: (farmerId: string, page = 1, limit = 10) =>
    apiClient
      .get<
        ApiResponse<FarmerReviewsResponse>
      >(`/farmers/${farmerId}/reviews`, { params: { page, limit } })
      .then((r) => r.data),

  createReview: (farmerId: string, data: { rating: number; content: string }) =>
    apiClient
      .post<ApiResponse>(`/farmers/${farmerId}/reviews`, data)
      .then((r) => r.data),

  // Services
  getServices: (farmerId: string) =>
    apiClient
      .get<ApiResponse<FarmerServiceItem[]>>(`/farmers/${farmerId}/services`)
      .then((r) => r.data),

  createService: (farmerId: string, data: Partial<FarmerServiceItem>) =>
    apiClient
      .post<
        ApiResponse<FarmerServiceItem>
      >(`/farmers/${farmerId}/services`, data)
      .then((r) => r.data),

  updateService: (
    farmerId: string,
    serviceId: string,
    data: Partial<FarmerServiceItem>,
  ) =>
    apiClient
      .patch<
        ApiResponse<FarmerServiceItem>
      >(`/farmers/${farmerId}/services/${serviceId}`, data)
      .then((r) => r.data),

  deleteService: (farmerId: string, serviceId: string) =>
    apiClient
      .delete(`/farmers/${farmerId}/services/${serviceId}`)
      .then((r) => r.data),
};
