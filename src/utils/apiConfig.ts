export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getToken = (): string | undefined =>
    typeof window !== "undefined"
        ? localStorage.getItem("token") || undefined
        : undefined;
