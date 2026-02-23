// app/booking/page.tsx 
"use client"; 

import React, { Suspense } from 'react';
import BookingFlow from '@/components/booking/BookingFlow';

// Main page component with Suspense boundary
const BookingPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4EFE7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading booking details...</p>
        </div>
      </div>
    }>
      <BookingFlow />
    </Suspense>
  );
};

export default BookingPage;