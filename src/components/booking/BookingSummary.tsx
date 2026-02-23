"use client";
import React from 'react';
import { Lock } from 'lucide-react';
import { BookingData } from '@/types/booking';

interface Props {
  bookingData: BookingData;
  additionalMembersCount: number;
  currentStep: number;
}

const BookingSummary: React.FC<Props> = ({ bookingData, additionalMembersCount, currentStep }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-25">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-black pb-3">Booking Summary</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 font-semibold">Destination</p>
          <p className="text-gray-800 font-bold">{bookingData.destination}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 font-semibold">Departure Date</p>
          <p className="text-gray-800 font-bold">{bookingData.departureDate}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 font-semibold">Travelers</p>
          <p className="text-gray-800 font-bold">{1 + additionalMembersCount} Person(s)</p>
        </div>

        <div className="border-t-2 pt-4 mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Price per person</span>
            <span className="font-semibold">${bookingData.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Number of travelers</span>
            <span className="font-semibold">× {1 + additionalMembersCount}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-black pt-3 border-t">
            <span>Total Amount</span>
            <span>${(bookingData.price * (1 + additionalMembersCount)).toLocaleString()}</span>
          </div>
        </div>

        {currentStep === 3 && (
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-blue-800 font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Secure Payment
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Your payment information is encrypted and protected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;