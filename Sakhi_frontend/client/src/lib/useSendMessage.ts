import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Message } from "@shared/schema";

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
