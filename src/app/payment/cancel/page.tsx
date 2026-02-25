"use client";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4EFE7] px-4">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border-t-8 border-red-500 p-8 text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />

        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          You cancelled the payment. No amount has been charged.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl"
          >
            Try Again
          </button>

          <button
            onClick={() => router.replace("/your_bookings")}
            className="w-full py-3 border border-gray-300 text-gray-700 font-semibold cursor-pointer hover:bg-gray-100 rounded-xl"
          >
            Continue
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          You can restart the booking process anytime.
        </p>
      </div>
    </div>
  );
}
