export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
