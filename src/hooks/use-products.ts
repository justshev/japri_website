import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi, type ProductListParams } from "@/lib/api/products";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params?: ProductListParams) =>
    [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  reviews: (id: string) => [...productKeys.detail(id), "reviews"] as const,
};

export function useProducts(params?: ProductListParams) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productsApi.list(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof productsApi.update>[1]) =>
      productsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

export function useToggleWishlist(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => productsApi.toggleWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}

export function useProductReviews(productId: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: [...productKeys.reviews(productId), page],
    queryFn: () => productsApi.getReviews(productId, page, limit),
    enabled: !!productId,
  });
}

export function useCreateProductReview(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number; content: string }) =>
      productsApi.createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.reviews(productId),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });
    },
  });
}

export function useMarkReviewHelpful(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) =>
      productsApi.markHelpful(productId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.reviews(productId),
      });
    },
  });
}
