import { useQuery } from "@tanstack/react-query";
import { communityApi } from "@/lib/api/community";

export const communityKeys = {
  all: ["community"] as const,
  stats: () => [...communityKeys.all, "stats"] as const,
  topFarmers: (limit?: number) =>
    [...communityKeys.all, "topFarmers", limit] as const,
  regions: () => [...communityKeys.all, "regions"] as const,
  recentMembers: (limit?: number) =>
    [...communityKeys.all, "recentMembers", limit] as const,
};

export function useCommunityStats() {
  return useQuery({
    queryKey: communityKeys.stats(),
    queryFn: communityApi.getStats,
  });
}

export function useTopFarmers(limit = 10) {
  return useQuery({
    queryKey: communityKeys.topFarmers(limit),
    queryFn: () => communityApi.getTopFarmers(limit),
  });
}

export function useRegions() {
  return useQuery({
    queryKey: communityKeys.regions(),
    queryFn: communityApi.getRegions,
  });
}

export function useRecentMembers(limit = 10) {
  return useQuery({
    queryKey: communityKeys.recentMembers(limit),
    queryFn: () => communityApi.getRecentMembers(limit),
  });
}
