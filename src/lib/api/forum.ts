import apiClient from "./client";
import type {
  ApiResponse,
  ForumPostsResponse,
  ForumPostDetail,
  CommentsResponse,
  CreatePostPayload,
  CreateCommentPayload,
} from "./types";

export interface ForumPostsParams {
  search?: string;
  category?: string;
  sort?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export const forumApi = {
  // Posts
  listPosts: (params?: ForumPostsParams) =>
    apiClient
      .get<ApiResponse<ForumPostsResponse>>("/forum/posts", { params })
      .then((r) => r.data),

  getPost: (id: string) =>
    apiClient
      .get<ApiResponse<ForumPostDetail>>(`/forum/posts/${id}`)
      .then((r) => r.data),

  createPost: (data: CreatePostPayload) =>
    apiClient
      .post<ApiResponse<ForumPostDetail>>("/forum/posts", data)
      .then((r) => r.data),

  updatePost: (id: string, data: Partial<CreatePostPayload>) =>
    apiClient
      .patch<ApiResponse<ForumPostDetail>>(`/forum/posts/${id}`, data)
      .then((r) => r.data),

  deletePost: (id: string) =>
    apiClient.delete(`/forum/posts/${id}`).then((r) => r.data),

  toggleLike: (id: string) =>
    apiClient
      .post<
        ApiResponse<{ isLiked: boolean; likeCount: number }>
      >(`/forum/posts/${id}/like`)
      .then((r) => r.data),

  toggleBookmark: (id: string) =>
    apiClient
      .post<
        ApiResponse<{ isBookmarked: boolean }>
      >(`/forum/posts/${id}/bookmark`)
      .then((r) => r.data),

  // Comments
  getComments: (postId: string, page = 1, limit = 20) =>
    apiClient
      .get<ApiResponse<CommentsResponse>>(`/forum/posts/${postId}/comments`, {
        params: { page, limit },
      })
      .then((r) => r.data),

  createComment: (postId: string, data: CreateCommentPayload) =>
    apiClient
      .post<ApiResponse>(`/forum/posts/${postId}/comments`, data)
      .then((r) => r.data),

  toggleCommentLike: (commentId: string) =>
    apiClient
      .post<
        ApiResponse<{ isLiked: boolean; likeCount: number }>
      >(`/forum/comments/${commentId}/like`)
      .then((r) => r.data),

  markBestAnswer: (commentId: string) =>
    apiClient
      .patch<ApiResponse>(`/forum/comments/${commentId}/best-answer`)
      .then((r) => r.data),

  reportComment: (commentId: string, reason: string) =>
    apiClient
      .post<ApiResponse>(`/forum/comments/${commentId}/report`, { reason })
      .then((r) => r.data),
};
