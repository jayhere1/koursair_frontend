// Server-side: use the direct backend URL (HTTP ELB — no mixed content issue)
// Client-side: use the /api/proxy route to avoid HTTPS→HTTP mixed content
export const BASE_URL =
    typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_API_BASE_URL
        : "/api/proxy";

export const getToken = (): string | undefined => {
    if (typeof window === "undefined") return undefined;
    // Read from Zustand store first, fall back to localStorage
    try {
        const { useAuthStore } = require('@/stores/authStore');
        const token = useAuthStore.getState().token;
        if (token) return token;
    } catch {
        // Store not initialized yet, fall back
    }
    return localStorage.getItem("token") || undefined;
};
