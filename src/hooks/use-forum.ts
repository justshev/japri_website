import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { forumApi, type ForumPostsParams } from "@/lib/api/forum";

export const forumKeys = {
  all: ["forum"] as const,
  lists: () => [...forumKeys.all, "list"] as const,
  list: (params?: ForumPostsParams) => [...forumKeys.lists(), params] as const,
  details: () => [...forumKeys.all, "detail"] as const,
  detail: (id: string) => [...forumKeys.details(), id] as const,
  comments: (postId: string) =>
    [...forumKeys.detail(postId), "comments"] as const,
};

export function useForumPosts(params?: ForumPostsParams) {
  return useQuery({
    queryKey: forumKeys.list(params),
    queryFn: () => forumApi.listPosts(params),
  });
}

export function useForumPostsInfinite(params?: Omit<ForumPostsParams, "page">) {
  return useInfiniteQuery({
    queryKey: [...forumKeys.lists(), "infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      forumApi.listPosts({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const data = lastPage.data;
      if (!data) return undefined;
      const { page, totalPages } = data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function useForumPost(id: string) {
  return useQuery({
    queryKey: forumKeys.detail(id),
    queryFn: () => forumApi.getPost(id),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: forumApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forumKeys.lists() });
    },
  });
}

export function useUpdatePost(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof forumApi.updatePost>[1]) =>
      forumApi.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forumKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: forumKeys.lists() });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: forumApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forumKeys.lists() });
    },
  });
}

export function useToggleLike(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => forumApi.toggleLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forumKeys.detail(postId) });
      queryClient.invalidateQueries({ queryKey: forumKeys.lists() });
    },
  });
}

export function useToggleBookmark(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => forumApi.toggleBookmark(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forumKeys.detail(postId) });
    },
  });
}

export function useComments(postId: string, page = 1, limit = 20) {
  return useQuery({
    queryKey: [...forumKeys.comments(postId), page],
    queryFn: () => forumApi.getComments(postId, page, limit),
    enabled: !!postId,
  });
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { content: string; parentId?: string }) =>
      forumApi.createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.comments(postId),
      });
      queryClient.invalidateQueries({ queryKey: forumKeys.detail(postId) });
    },
  });
}

export function useToggleCommentLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: forumApi.toggleCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forumKeys.all });
    },
  });
}

export function useMarkBestAnswer(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: forumApi.markBestAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: forumKeys.comments(postId),
      });
    },
  });
}

export function useReportComment() {
  return useMutation({
    mutationFn: ({
      commentId,
      reason,
    }: {
      commentId: string;
      reason: string;
    }) => forumApi.reportComment(commentId, reason),
  });
}
