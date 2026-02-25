"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProtectedPage } from '@/hooks/useProtectedPage';

// Components
import Popup from '@/components/Popup';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/landing/Footer';
import BookingStepper from './BookingStepper';
import BookingSummary from './BookingSummary';
import TravelerDetails from './MemberDetails';

// Logic Hook
import { useBookingSubmit } from '@/hooks/useTahitiBooking';

// Store
import { useBookingStore } from '@/stores';

const BookingFlow: React.FC = () => {
  const searchParams = useSearchParams();
  const { isReady, isAuthenticated } = useProtectedPage();

  // -- Business Logic Hook --
  const { submitBooking, isLoading, error, clearError } = useBookingSubmit();

  // -- UI State --
  const [popup, setPopup] = useState<{ message: string; type?: "success" | "error" | "info" } | null>(null);

  // Store
  const userName = useBookingStore((s) => s.userName);
  const userEmail = useBookingStore((s) => s.userEmail);
  const userPhone = useBookingStore((s) => s.userPhone);
  const userPhoneCode = useBookingStore((s) => s.userPhoneCode);
  const bookingData = useBookingStore((s) => s.bookingData);
  const counts = useBookingStore((s) => s.counts);
  const members = useBookingStore((s) => s.members);
  const setBookingData = useBookingStore((s) => s.setBookingData);
  const loadUserFromStorage = useBookingStore((s) => s.loadUserFromStorage);
  const validateForm = useBookingStore((s) => s.validateForm);

  // -- Effects --
  useEffect(() => {
    if (error) setPopup({ message: error, type: 'error' });
  }, [error]);

  // Load User Data
  useEffect(() => {
    if (isReady && isAuthenticated) {
      loadUserFromStorage();
    }
  }, [isReady, isAuthenticated, loadUserFromStorage]);

  // Load Params
  useEffect(() => {
    const destination = searchParams?.get('destination');
    const date = searchParams?.get('date');
    const price = searchParams?.get('price');
    if (destination && date && price) {
      setBookingData({ destination, departureDate: date, price: parseFloat(price) });
    }
  }, [searchParams, setBookingData]);

  const handleNext = async () => {
    try {
      await submitBooking({
        userData: {
          name: userName,
          email: userEmail,
          phone: userPhoneCode ? `${userPhoneCode}${userPhone}` : userPhone,
        },
        counts,
        members,
        validateForm,
      });
    } catch (e: unknown) {
      if (!error) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        setPopup({ message: errorMessage, type: 'error' });
      }
    }
  };

  const handleClosePopup = () => {
    setPopup(null);
    clearError();
  };

  if (!isReady) return <div className="min-h-screen bg-[#F4EFE7] flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <main>
      <Navbar />
      {popup && <Popup message={popup.message} type={popup.type} onClose={handleClosePopup} />}
      <div className="min-h-screen bg-[#F4EFE7] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <BookingStepper currentStep={1} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TravelerDetails
                onNext={handleNext}
                isLoading={isLoading}
              />
            </div>
            <div className="lg:col-span-1">
              <BookingSummary
                bookingData={bookingData}
                additionalMembersCount={(counts.adults + counts.children) - 1}
                currentStep={1}
              />
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  );
};

export default BookingFlow;
