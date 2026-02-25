"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { capturePaypalOrder } from "@/services/paypalApi";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("token");
  const hasCapturedRef = useRef(false);

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!orderId || hasCapturedRef.current) return;

    hasCapturedRef.current = true;

    const capturePayment = async () => {
      try {
        await capturePaypalOrder({ order_id: orderId });
        setStatus("success");
      } catch (err) {
        console.error("Capture failed:", err);
        setStatus("error");
        setErrorMsg(
          "We received your payment approval, but confirmation failed."
        );
      }
    };

    capturePayment();
  }, [orderId]);

  
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFE7]">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <p className="text-base font-semibold text-gray-700">
            Finalizing your payment…
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please do not refresh this page
          </p>
        </div>
      </div>
    );
  }


  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFE7] px-4">
        <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border-t-8 border-red-500 p-8 text-center">
          <AlertTriangle className="w-14 h-14 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Payment Verification Issue
          </h1>
          <p className="text-gray-600 mb-6">{errorMsg}</p>

           <button
          onClick={() => router.replace("/your_bookings")}
          className="w-full py-3 bg-primary text-white font-bold rounded-xl cursor-pointer hover:bg-primary/90 transition"
        >
        Continue
        </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4EFE7] px-4">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border-t-8 border-green-600 p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />

        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment has been confirmed and your booking is secured.
        </p>

        {orderId && (
          <div className="bg-gray-50 border rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-500 mb-1">PayPal Order ID</p>
            <p className="text-xs font-mono break-all text-gray-800">
              {orderId}
            </p>
          </div>
        )}

        <button
          onClick={() => router.replace("/your_bookings")}
          className="w-full py-3 bg-primary text-white font-bold rounded-xl cursor-pointer hover:bg-primary/90 transition"
        >
          Continue
        </button>

        <p className="text-xs text-gray-500 mt-4">
          A confirmation email will be sent to you shortly.
        </p>
      </div>
    </div>
  );
}
