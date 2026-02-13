import apiClient from "./client";
import type {
  ApiResponse,
  ConversationItem,
  MessagesResponse,
  SendMessagePayload,
} from "./types";

export const chatApi = {
  getConversations: () =>
    apiClient
      .get<ApiResponse<ConversationItem[]>>("/conversations")
      .then((r) => r.data),

  createConversation: (participantId: string, productId?: string) =>
    apiClient
      .post<ApiResponse<{ id: string; isNew: boolean }>>("/conversations", {
        participantId,
        productId,
      })
      .then((r) => r.data),

  getMessages: (conversationId: string, page = 1, limit = 50) =>
    apiClient
      .get<
        ApiResponse<MessagesResponse>
      >(`/conversations/${conversationId}/messages`, { params: { page, limit } })
      .then((r) => r.data),

  sendMessage: (conversationId: string, data: SendMessagePayload) =>
    apiClient
      .post<ApiResponse>(`/conversations/${conversationId}/messages`, data)
      .then((r) => r.data),

  markAsRead: (conversationId: string) =>
    apiClient
      .patch<ApiResponse>(`/conversations/${conversationId}/read`)
      .then((r) => r.data),

  report: (conversationId: string, reason: string) =>
    apiClient
      .post<ApiResponse>(`/conversations/${conversationId}/report`, { reason })
      .then((r) => r.data),
};
