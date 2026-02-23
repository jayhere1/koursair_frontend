import type { CancelBookingPayload, CancelBookingResponse, UserBookingsPaginated } from "@/types/bookings";
import type { ApiResponse } from "@/types/api";
import { BASE_URL, getToken } from "@/utils/apiConfig";
import { BOOKING_MESSAGES } from "@/utils/bookingMessages";

export async function getUserBookings(
    status: "upcoming" | "completed" | "cancelled",
    page: number = 1,
    pageSize: number = 10,
    signal?: AbortSignal
): Promise<UserBookingsPaginated> {
    const token = getToken();
    if (!token) {
        throw { status: 401, message: "Not authenticated" };
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };

    const res = await fetch(
        `${BASE_URL}/bookings/me?status=${status}&page=${page}&page_size=${pageSize}`,
        { headers, signal }
    );

    const json = await res.json();

    if (!res.ok || !json?.success) {
        throw {
            status: res.status,
            message: json?.message || "Failed to fetch bookings",
        };
    }

    return json.data;
}


export async function cancelBooking(
    bookingId: string,
    payload: CancelBookingPayload
): Promise<ApiResponse<CancelBookingResponse>> {
    try {
        const token = getToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(
            `${BASE_URL}/bookings/cancel/${bookingId}`,
            {
                method: "PUT",
                headers,
                body: JSON.stringify(payload),
            }
        );

        let json: ApiResponse<CancelBookingResponse> | null = null;
        try {
            json = await res.json();
        } catch {
            // If response is not JSON, fallback
        }

        if (!res.ok) {
            if (res.status === 401) {
                throw new Error(BOOKING_MESSAGES.UNAUTHORIZED);
            }
            const apiMessage = json?.message;
            throw new Error(apiMessage || `Error ${res.status}: ${res.statusText}`);
        }

        if (!json || !json.success) {
            throw new Error(json?.message || BOOKING_MESSAGES.CANCEL_FAILED);
        }

        // ✅ Success
        return {
            ...json,
            message: BOOKING_MESSAGES.CANCEL_SUCCESS,
        };

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error(BOOKING_MESSAGES.CANCEL_FAILED);
    }
}
