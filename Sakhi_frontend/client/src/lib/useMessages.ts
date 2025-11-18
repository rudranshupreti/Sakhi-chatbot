import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient, BASE_URL } from "@/lib/queryClient";
import type { Message } from "@shared/schema";

export function useMessages(conversationId: string | null) {
  return useQuery<Message[]>({
    queryKey: ["/api/messages", conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      const res = await fetch(`${BASE_URL}/api/messages/${conversationId}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
    enabled: !!conversationId,
  });
}

export function useSendMessage() {
  return useMutation({
    mutationFn: async ({
      conversationId,
      content,
    }: {
      conversationId: string;
      content: string;
    }) => {
      const res = await apiRequest("POST", "/api/messages", {
        conversationId,
        content,
        sender: "user",
      });
      return res.json();
    },

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["/api/messages", vars.conversationId],
      });
    },
  });
}
