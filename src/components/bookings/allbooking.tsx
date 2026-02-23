"use client";

import React, { useState, useEffect, useRef } from "react";
import KoursairImage from "../Media/Images/KoursairImage";
import { COUNTRY_IMAGES } from "@/utils/constants";
import { Booking } from "@/types/bookings";
import { AuthModals } from "../AuthModal";
import { BeatLoader } from "react-spinners";
import { cancelBooking, getUserBookings } from "@/services/bookingsApi";
import { createPaypalOrder } from "@/services/paypalApi";
import { toast } from "sonner";
import Pagination from "../UIComponents/pagination";
import ParticipantSlider from "./ParticipantSlider";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useProtectedPage } from "@/hooks/useProtectedPage";


const YourBookings = () => {
  const { isReady, isAuthenticated } = useProtectedPage();
const latestRequestRef = useRef(0);
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "completed" | "cancelled"
  >("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [totalPages, setTotalPages] = useState(1);

  const [showOtherTooltip, setShowOtherTooltip] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelRemarks, setCancelRemarks] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [payLoading, setPayLoading] = useState<string | null>(null); 

useEffect(() => {
  if (!isAuthenticated) return;

  const controller = new AbortController();

  const requestId = ++latestRequestRef.current;

  setLoading(true);

  getUserBookings(activeTab, page, pageSize, controller.signal)
    .then((result) => {
      if (requestId === latestRequestRef.current) {
        setBookings(result.bookings);
        setTotalPages(Number(result.total_pages) || 1);
      }
    })
    .catch((err) => {
      if (err.name === "AbortError") return;

      if (requestId === latestRequestRef.current) {
        toast.error(err.message || "Server is currently unavailable.");
        setBookings([]);
        setTotalPages(1);
      }
    })
    .finally(() => {
      if (requestId === latestRequestRef.current) {
        setLoading(false);
      }
    });

  return () => controller.abort();

}, [activeTab, page, pageSize, isAuthenticated]);

 if (!isReady) {
  return null; 
}

if (!isAuthenticated) {
  return null; 
}

  const handlePayNow = async (booking: Booking) => {
    setPayLoading(booking.id);
    try {
      const orderPayload = {
        payment_id: booking.payment_id,
        amount: Number(booking.remaining_amount),
        currency: booking.currency,
        destination: booking.trip_name,
      };
      const orderRes = await createPaypalOrder(orderPayload);
      if (orderRes.data && orderRes.data.approval_url) {
        window.location.href = orderRes.data.approval_url;
      } else if (orderRes.message) {
        toast.error(orderRes.message);
      } else {
        toast.error("PayPal order failed");
      }
    } catch (err: unknown) {
      type ErrorWithMessage = { message: string };
      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as ErrorWithMessage).message === "string"
      ) {
        toast.error((err as ErrorWithMessage).message || "PayPal order failed");
      } else {
        toast.error("PayPal order failed");
      }
      console.error("PayPal order error", err);
    } finally {
      setPayLoading(null);
    }
  };

  const handleCancelBooking = async () => {
    if (!cancelReason) {
      toast.error("Please select a reason for cancellation.");
      return;
    }

    if (cancelReason === "Others" && !cancelRemarks.trim()) {
      toast.error("Please type your reason in the 'Other' field.");
      return;
    }

    if (!selectedBookingId) {
      toast.error("No booking selected for cancellation.");
      return;
    }

    try {
      setCancelLoading(true);

      // 1️⃣ Cancel booking
      await cancelBooking(selectedBookingId, {
        reason: cancelReason,
        remarks: cancelRemarks || "",
      });

      toast.success("Booking cancelled successfully.");

      // 2️⃣ Reset modal & form state
      setShowCancelModal(false);
      setCancelReason("");
      setCancelRemarks("");
      setSelectedBookingId(null);

      // 3️⃣ Refresh bookings (defensive)
      try {
        const updated = await getUserBookings(activeTab, page, pageSize);
        setBookings(updated.bookings || []);
        setTotalPages(updated.total_pages || 1);
      } catch (refreshError) {
        console.warn("Failed to refresh bookings", refreshError);
        setBookings([]);
        setTotalPages(1);
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to cancel booking.");
        console.warn(error.message);

      } else {
        toast.error("Unknown error occurred");
        console.error("Unknown error occurred");
      }
    } finally {
      setCancelLoading(false);
    }
  };



  return (
    <>
      <AuthModals />
      <div className="w-full">
        <div
          className="relative h-64 sm:h-80 md:h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Bookings
            </h1>
            <p className="text-lg opacity-90">
              Manage your upcoming and past adventures with ease.
            </p>
          </div>
        </div>

        <div className="py-12 bg-[#F4EFE7]">
          <div className="max-w-6xl mx-auto px-4">
            {/* TABS */}
            <div className="flex gap-3 mb-8">
              {(["upcoming", "completed", "cancelled"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setPage(1); 
                  }}
                  className={`px-6 cursor-pointer py-2 rounded-full capitalize ${activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* LIST */}
            {loading ? (
              <div className="text-center py-8"><BeatLoader color="#1b3658" /></div>
            ) : bookings.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6">
                  {bookings.map((booking: Booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-56 h-48 sm:h-auto">
                          <KoursairImage
                            src={COUNTRY_IMAGES[booking?.country || ""] || COUNTRY_IMAGES.Default}
                            alt={booking.trip_name || "Booking"}
                            fill
                            className="object-cover"
                          />

                          <span
                            className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md
      ${booking.payment_status?.label === "CONFIRMED" ||
                                booking.payment_status?.label === "COMPLETED"
                                ? "bg-green-600"
                                : booking.payment_status?.label === "CANCELLED"
                                  ? "bg-red-600"
                                  : "bg-gray-800"
                              }
    `}
                          >
                            {booking.payment_status?.label}
                          </span>
                        </div>


                        {/* CONTENT */}
                        <div className="flex-1 px-6 py-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* LEFT */}
                          <div className="space-y-2 text-sm sm:text-base text-gray-600">
                            <h3 className="text-xl font-bold text-primary">
                              {booking.trip_name}
                            </h3>
                            <p className=" text-gray-600 text-base font-semibold">
                              <b>Date:</b> {booking.booking_date}
                            </p>
                            <p className="text-gray-600 text-base font-semibold">
                              <b>Package:</b> {booking.package}
                            </p>

                            {!["CANCELLED", "COMPLETED"].includes(booking.trip_status?.label) && (
                              <button
                                onClick={() => {
                                  setSelectedBookingId(booking.id);
                                  setShowCancelModal(true);
                                }}
                                className="mt-6 bg-primary text-white px-4 py-2  rounded-xl disabled:bg-gray-300 cursor-pointer"
                              >
                                Cancel Booking
                              </button>
                            )}

                          </div>

                          <div>
                            {booking.travellers?.primary_traveller && (
                              <div className="mb-4">
                                <p className="mb-2 text-[#4A5565] text-base font-semibold">
                                  Primary Traveller
                                </p>

                                <div className="flex flex-col gap-3 pl-3">

                                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center  justify-center font-semibold text-lg">
                                    {booking.travellers.primary_traveller.first_name
                                      ?.charAt(0)
                                      .toUpperCase()}


                                  </div>
                                  <p className="text-base text-gray-800 font-medium">
                                    {capitalizeFirstLetter(
                                      [
                                        booking.travellers.primary_traveller.first_name,
                                        booking.travellers.primary_traveller.middle_name,
                                        booking.travellers.primary_traveller.last_name,
                                      ]
                                        .filter(Boolean)
                                        .join(" ")
                                    )}
                                  </p>

                                </div>
                              </div>
                            )}

                            {booking.travellers?.members &&
                              booking.travellers.members.length > 0 && (
                                <>
                                  <p className="mb-2 text-[#4A5565] text-base font-semibold">
                                    Participants
                                  </p>

                                  <ParticipantSlider members={booking.travellers.members} />
                                </>
                              )}



                            <p className="mt-4 text-[#4A5565] text-base">
                              <b>Booking ID:</b> {booking?.booking_id}
                            </p>
                            <div className="flex flex-wrap space-x-4 space-y-2 mt-2">
                              <p className=" text-[#4A5565] text-base">
                                <b >Total Amount:</b>  <span className="text-base font-medium text-black"> ${booking?.total_amount}</span>
                              </p>
                              <p className=" text-[#4A5565] text-base">
                                <b>Discount Amount:</b>  <span className="text-base font-medium text-gray-700 ">  ${booking?.discount_applied}</span>
                              </p>
                              <p className=" text-[#4A5565] text-base">
                                <b>Paid Amount:</b>  <span className="text-base font-medium text-green-600 ">  ${booking?.paid_amount}</span>
                              </p>

                              
                                {Number(booking?.remaining_amount) > 0 && (
                                  <p className=" text-[#4A5565] text-base">
                                    <b>Pending Amount:</b>  <span className="text-base font-medium text-red-600"> ${booking?.remaining_amount}</span>
                                  </p>
                                )}
                            </div>
                            {!["CANCELLED", "COMPLETED"].includes(booking.trip_status?.label) &&
                              Number(booking.remaining_amount) > 0 && (
                                <button
                                  className="mt-6 bg-primary cursor-pointer text-white px-4 py-2 rounded-xl disabled:bg-gray-300"
                                  disabled={payLoading === booking.id}
                                  onClick={() => handlePayNow(booking)}
                                >
                                  {payLoading === booking.id ? "Processing..." : "Pay Now"}
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={setPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                  }}
                />


              </>
            ) : (
              <div className="text-center py-10 text-gray-600">
                No {activeTab} bookings found.
              </div>
            )}
          </div>
        </div>
      </div>
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#F3F3F3] rounded-xl  w-full max-w-md shadow-xl relative">

            <button
              onClick={() => {
                setShowCancelModal(false);
                setCancelReason("");
                setCancelRemarks("");
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="bg-primary text-white px-4 py-3 rounded-t-xl text-3xl font-semibold">
              Cancel Booking
            </div>

            {/* BODY */}
            <div className="bg-white py-3 mx-1 px-4 space-y-4">
              <p className="text-lg text-[#636363]">
                Please select the reason for cancellation
              </p>

              {/* ROW LAYOUT */}
              <div className="grid grid-cols-[120px_1fr] gap-y-4 gap-x-4 items-center">

                {/* SELECT REASON */}
                <label className="text-base font-normal text-black">
                  Select Reason <span className="text-red-600">*</span>
                </label>

                <select
                  value={cancelReason}
                  onChange={(e) => {
                    setCancelReason(e.target.value);
                    if (e.target.value !== "Others") {
                      setCancelRemarks("");
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none text-gray-700 text-base"
                >
                  <option value="">Select Reason</option>
                  <option value="Schedule Change">Schedule Change</option>
                  <option value="Weather Condition">Weather Condition</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Lack of Amenities">Lack of Amenities</option>
                  <option value="I have Alternative Option">
                    I have Alternative Option
                  </option>
                  <option value="Others">Others</option>
                </select>

                <label className="text-base font-normal text-black">
                  Other
                </label>

                <div
                  className="relative group"
                  onMouseEnter={() => {
                    if (cancelReason !== "Others") {
                      setShowOtherTooltip(true);
                    }
                  }}
                  onMouseLeave={() => setShowOtherTooltip(false)}
                >
                  {showOtherTooltip && cancelReason !== "Others" && (
                    <div className="absolute -top-9 left-0 z-10  bg-red-500 text-white text-xs px-3 py-1 rounded-md shadow-lg whitespace-nowrap">
                      Please select the “Others” option to enter your reason
                    </div>
                  )}

                  <textarea
                    placeholder="Enter your reason"
                    value={cancelRemarks}
                    onChange={(e) => setCancelRemarks(e.target.value)}
                    disabled={cancelReason !== "Others"}
                    className={`w-full border text-gray-700 border-gray-300 bg-white rounded-lg px-3 py-2 focus:outline-none text-base
      ${cancelReason !== "Others"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-gray-300"
                      }`}
                  />
                </div>
              </div>
            </div>


            {/* FOOTER */}
            <div className="px-5 pb-5 text-center">
              <button
                // disabled={
                //   !cancelReason ||
                //   (isOtherSelected && !cancelRemarks.trim()) ||
                //   cancelLoading
                // }
                onClick={handleCancelBooking}
                className="mt-6 bg-primary cursor-pointer text-white px-4 py-2 rounded-xl disabled:bg-gray-300"
              >
                {cancelLoading ? "Cancelling..." : "Cancel Booking"}
              </button>

            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default YourBookings;
