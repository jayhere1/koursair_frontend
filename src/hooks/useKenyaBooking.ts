"use client";

import { PassportGuest } from "@/types/passport";
import { useState, useEffect } from "react";


export type PaymentPlan = "FULL" | "HALF" | "DEPOSIT";
export type RateType = "EARLY" | "NORMAL";

export interface BookingData {
  roomPreference: string;
  mealPreference: string;
  mealPreferenceOther: string;
  medicalRestrictions: string;
  travelInsurance: string;
  emergencyName: string;
  emergencyContact: string;
  mailingAddress: string;
  additionalInfo: string;
  mobilityIssues: string[];
  mobilityOther: string;
  allergies: string[];
  allergyDetails: string;
}

export function useKenyaBooking() {
  // ------------------ BASIC STATE ------------------
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [rateType, setRateType] = useState<RateType>("EARLY");
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan>("FULL");

  // ------------------ TRAVELERS ------------------
  const [travelers, setTravelers] = useState<PassportGuest[]>([
    {
      id: 1,
      prefix: "Mr",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dob: "",
      nationality: "",
    },
  ]);

  const [expandedTravelerId, setExpandedTravelerId] = useState<number | null>(1);
  const [uploadingPassportIds, setUploadingPassportIds] = useState<number[]>([]);

  // ------------------ BOOKING DATA ------------------
  const [bookingData, setBookingData] = useState<BookingData>({
    roomPreference: "",
    mealPreference: "",
    mealPreferenceOther: "",
    medicalRestrictions: "",
    travelInsurance: "No",
    emergencyName: "",
    emergencyContact: "",
    mailingAddress: "",
    additionalInfo: "",
    mobilityIssues: [],
    mobilityOther: "",
    allergies: [],
    allergyDetails: "",
  });

  // ------------------ DERIVED ------------------
  const totalTravelers = adultCount + childCount;
  const isFamilyBooking = totalTravelers >= 4;

  // Ensure traveler forms match count
  useEffect(() => {
    setTravelers((prev) => {
      if (prev.length > totalTravelers) return prev.slice(0, totalTravelers);
      return prev;
    });
  }, [totalTravelers]);

  // ------------------ HANDLERS ------------------
  const handleAddTraveler = () => {
    if (travelers.length >= totalTravelers) return;

    const newId = Date.now();
    setTravelers((prev) => [
      ...prev,
      {
        id: newId,
        prefix: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dob: "",
        nationality: "",
      },
    ]);
    setExpandedTravelerId(newId);
  };

  const handleRemoveTraveler = (id: number) => {
    setTravelers((prev) => prev.filter((t) => t.id !== id));
    if (expandedTravelerId === id) setExpandedTravelerId(null);
  };

  const handleTravelerChange = (
    id: number,
    field: keyof PassportGuest,
    value: string
  ) => {
    setTravelers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const toggleTraveler = (id: number) => {
    setExpandedTravelerId((prev) => (prev === id ? null : id));
  };

  const handleBookingChange = (
    name: keyof BookingData,
    value: string | string[]
  ) => {
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    // state
    adultCount,
    childCount,
    rateType,
    paymentPlan,
    travelers,
    bookingData,
    expandedTravelerId,
    uploadingPassportIds,
    totalTravelers,
    isFamilyBooking,

    // setters
    setAdultCount,
    setChildCount,
    setRateType,
    setPaymentPlan,
    setTravelers,
    setBookingData,
    setUploadingPassportIds,

    // handlers
    handleAddTraveler,
    handleRemoveTraveler,
    handleTravelerChange,
    toggleTraveler,
    handleBookingChange,
  };
}
