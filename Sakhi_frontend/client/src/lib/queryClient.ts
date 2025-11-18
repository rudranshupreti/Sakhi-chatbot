import { QueryClient, QueryFunction } from "@tanstack/react-query";

// -------------------------
// BASE URL (LAN + Production Safe)
// -------------------------
export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://192.168.29.173:8000";

// -------------------------
// Throw Error Helper
// -------------------------
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// -------------------------
// GLOBAL API REQUEST WRAPPER
// -------------------------
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  // Normalize URL (remove duplicate slashes)
  const safeUrl = url.startsWith("/") ? url : `/${url}`;
  const finalURL = `${BASE_URL}${safeUrl}`;

  const res = await fetch(finalURL, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    credentials: "include",
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

// -------------------------
// FIXED Query Function
// -------------------------
export const getQueryFn: <T>(opts: {
  on401: "returnNull" | "throw";
}) => QueryFunction<T> =
  ({ on401 }) =>
  async ({ queryKey }) => {
    // Clean join → prevents `/api/messages123` bug
    const path = queryKey
      .map((part) => String(part).replace(/^\/+/, "")) // remove leading slashes
      .join("/");

    const finalURL = `${BASE_URL}/${path}`;

    const res = await fetch(finalURL, { credentials: "include" });

    if (on401 === "returnNull" && res.status === 401) return null;

    await throwIfResNotOk(res);
    return res.json();
  };

// -------------------------
// GLOBAL QUERY CLIENT
// -------------------------
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
    mutations: {
      retry: false,
    },
  },
});
