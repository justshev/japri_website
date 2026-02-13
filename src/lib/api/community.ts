import apiClient from "./client";
import type {
  ApiResponse,
  CommunityStats,
  TopFarmerItem,
  RegionItem,
  RecentMemberItem,
} from "./types";

export const communityApi = {
  getStats: () =>
    apiClient
      .get<ApiResponse<CommunityStats>>("/community/stats")
      .then((r) => r.data),

  getTopFarmers: (limit = 10) =>
    apiClient
      .get<ApiResponse<TopFarmerItem[]>>("/community/top-farmers", {
        params: { limit },
      })
      .then((r) => r.data),

  getRegions: () =>
    apiClient
      .get<ApiResponse<RegionItem[]>>("/community/regions")
      .then((r) => r.data),

  getRecentMembers: (limit = 10) =>
    apiClient
      .get<ApiResponse<RecentMemberItem[]>>("/community/recent-members", {
        params: { limit },
      })
      .then((r) => r.data),
};
