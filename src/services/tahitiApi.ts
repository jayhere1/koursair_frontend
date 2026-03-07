// services/bookingService.ts
import {  ApiResponse } from "@/types/api";
import { BASE_URL, getToken } from "@/utils/apiConfig";
import { BookingPayload, BookingResponseData } from "@/types/booking";

const API_BASE_URL = BASE_URL;

export const bookingService = {
  createTahitiBooking: async (payload: BookingPayload): Promise<BookingResponseData> => {
    const token = getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users/tahiti/booking`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const result: ApiResponse<BookingResponseData> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Booking request failed");
    }

    return result.data;
  },
};