import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { farmersApi, type FarmerListParams } from "@/lib/api/farmers";

export const farmerKeys = {
  all: ["farmers"] as const,
  lists: () => [...farmerKeys.all, "list"] as const,
  list: (params?: FarmerListParams) => [...farmerKeys.lists(), params] as const,
  details: () => [...farmerKeys.all, "detail"] as const,
  detail: (id: string) => [...farmerKeys.details(), id] as const,
  reviews: (id: string) => [...farmerKeys.detail(id), "reviews"] as const,
  services: (id: string) => [...farmerKeys.detail(id), "services"] as const,
};

export function useFarmers(params?: FarmerListParams) {
  return useQuery({
    queryKey: farmerKeys.list(params),
    queryFn: () => farmersApi.list(params),
  });
}

export function useFarmer(id: string) {
  return useQuery({
    queryKey: farmerKeys.detail(id),
    queryFn: () => farmersApi.getById(id),
    enabled: !!id,
  });
}

export function useFarmerReviews(farmerId: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: [...farmerKeys.reviews(farmerId), page],
    queryFn: () => farmersApi.getReviews(farmerId, page, limit),
    enabled: !!farmerId,
  });
}

export function useFarmerServices(farmerId: string) {
  return useQuery({
    queryKey: farmerKeys.services(farmerId),
    queryFn: () => farmersApi.getServices(farmerId),
    enabled: !!farmerId,
  });
}

export function useCreateFarmer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: farmersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: farmerKeys.all });
    },
  });
}

export function useCreateFarmerReview(farmerId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { rating: number; content: string }) =>
      farmersApi.createReview(farmerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: farmerKeys.reviews(farmerId) });
      queryClient.invalidateQueries({ queryKey: farmerKeys.detail(farmerId) });
    },
  });
}
