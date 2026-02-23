// hooks/useBookingSubmit.ts
import { useState } from "react";
import { bookingService } from "@/services/tahitiApi";
import { buildBookingPayload } from "@/utils/bookingMapper";
import { MemberDetails, BookingCounts } from "@/types/booking";
import { createPaypalOrder } from "@/services/paypalApi";

interface SubmitParams {
  userData: { name: string; email: string; phone: string };
  counts: BookingCounts;
  members: MemberDetails[];
  validateForm: () => { isValid: boolean; firstErrorMessage: string };
}

export const useBookingSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitBooking = async ({ userData, counts, members, validateForm }: SubmitParams) => {
    setError(null);

    // 1. Validation Layer
    const { isValid, firstErrorMessage } = validateForm();
    if (!isValid) {
      throw new Error(firstErrorMessage);
    }

    setIsLoading(true);

    try {
      const totalTravelers = counts.adults + counts.children;
      const activeMembers = members.slice(0, totalTravelers);

      // 2. Use passport URLs already uploaded in the UI
      const membersWithUrls = activeMembers.map((m) => ({
        member: m,
        url: m.passportUrl || "",
      }));

      // 3. Data Transformation Layer
      const payload = buildBookingPayload(userData, counts, membersWithUrls);

      // 4. API Submission Layer
      const bookingData = await bookingService.createTahitiBooking(payload);

      // 5. Payment Initiation Layer
      const orderPayload = {
        payment_id:  bookingData.payment_id,
        amount: bookingData.total_payable_amount,
        currency: bookingData.currency || "USD",
        destination: "Tahiti",
      };
      const orderRes = await createPaypalOrder(orderPayload);
            if (orderRes.data && orderRes.data.approval_url) {
              window.location.href = orderRes.data.approval_url;
            } else {
              throw new Error("PayPal order failed");
            }
          } catch (err) {
            console.error("Registration failed", err);
          } finally {
            setIsLoading(false);
          }
  };

  return {
    submitBooking,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};