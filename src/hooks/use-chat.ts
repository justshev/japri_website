import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/lib/api/chat";

export const chatKeys = {
  all: ["chat"] as const,
  conversations: () => [...chatKeys.all, "conversations"] as const,
  messages: (conversationId: string) =>
    [...chatKeys.all, "messages", conversationId] as const,
};

export function useConversations() {
  return useQuery({
    queryKey: chatKeys.conversations(),
    queryFn: chatApi.getConversations,
    refetchInterval: 15_000, // auto-refresh every 15s
  });
}

export function useMessages(conversationId: string, page = 1, limit = 50) {
  return useQuery({
    queryKey: [...chatKeys.messages(conversationId), page],
    queryFn: () => chatApi.getMessages(conversationId, page, limit),
    enabled: !!conversationId,
    refetchInterval: 5_000, // auto-refresh every 5s for active chat
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      participantId,
      productId,
    }: {
      participantId: string;
      productId?: string;
    }) => chatApi.createConversation(participantId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.conversations() });
    },
  });
}

export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      content: string;
      type?: "text" | "image" | "file" | "product_card";
      metadata?: unknown;
    }) => chatApi.sendMessage(conversationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.messages(conversationId),
      });
      queryClient.invalidateQueries({ queryKey: chatKeys.conversations() });
    },
  });
}

export function useMarkAsRead(conversationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => chatApi.markAsRead(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.conversations() });
    },
  });
}

export function useReportConversation() {
  return useMutation({
    mutationFn: ({
      conversationId,
      reason,
    }: {
      conversationId: string;
      reason: string;
    }) => chatApi.report(conversationId, reason),
  });
}
