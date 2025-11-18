import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient, BASE_URL } from "@/lib/queryClient";

export function useConversations(
  userId: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["/api/conversations", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(`${BASE_URL}/api/conversations/${userId}`);
      if (!res.ok) throw new Error("Failed to load conversations");
      return res.json();
    },
    enabled: options?.enabled ?? true,
  });
}

export function useCreateConversation() {
  return useMutation({
    mutationFn: async (data: { userId: string; title: string }) => {
      const res = await apiRequest("POST", "/api/conversations", data);
      return res.json(); // 🔥 FIX: return conversation JSON
    },

    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["/api/conversations", vars.userId],
      });
    },
  });
}

export function useDeleteConversation() {
  return useMutation({
    mutationFn: async (id: string) =>
      apiRequest("DELETE", `/api/conversations/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/conversations"],
      });
    },
  });
}
