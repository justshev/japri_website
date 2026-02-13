import apiClient from "./client";
import type {
  ApiResponse,
  ProductListResponse,
  ProductDetail,
  ProductReviewsResponse,
  CreateProductPayload,
} from "./types";

export interface ProductListParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const productsApi = {
  list: (params?: ProductListParams) =>
    apiClient
      .get<ApiResponse<ProductListResponse>>("/products", { params })
      .then((r) => r.data),

  getById: (id: string) =>
    apiClient
      .get<ApiResponse<ProductDetail>>(`/products/${id}`)
      .then((r) => r.data),

  create: (data: CreateProductPayload) =>
    apiClient
      .post<ApiResponse<ProductDetail>>("/products", data)
      .then((r) => r.data),

  update: (id: string, data: Partial<CreateProductPayload>) =>
    apiClient
      .patch<ApiResponse<ProductDetail>>(`/products/${id}`, data)
      .then((r) => r.data),

  delete: (id: string) =>
    apiClient.delete(`/products/${id}`).then((r) => r.data),

  toggleWishlist: (id: string) =>
    apiClient
      .post<ApiResponse<{ isWishlisted: boolean }>>(`/products/${id}/wishlist`)
      .then((r) => r.data),

  // Reviews
  getReviews: (productId: string, page = 1, limit = 10) =>
    apiClient
      .get<
        ApiResponse<ProductReviewsResponse>
      >(`/products/${productId}/reviews`, { params: { page, limit } })
      .then((r) => r.data),

  createReview: (
    productId: string,
    data: { rating: number; content: string },
  ) =>
    apiClient
      .post<ApiResponse>(`/products/${productId}/reviews`, data)
      .then((r) => r.data),

  markHelpful: (productId: string, reviewId: string) =>
    apiClient
      .post<ApiResponse>(`/products/${productId}/reviews/${reviewId}/helpful`)
      .then((r) => r.data),
};
