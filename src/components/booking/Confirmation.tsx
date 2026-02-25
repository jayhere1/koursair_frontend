"use client";
import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { BookingData } from '@/types/booking';

interface Props {
  status: 'pending' | 'success' | 'failed' | null;
  bookingData: BookingData;
  email: string;
  onNavigate: () => void;
  onRetry: () => void;
}

const StepConfirmation: React.FC<Props> = ({ status, bookingData, email, onNavigate, onRetry }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {status === 'success' && (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Booking Confirmed!</h2>
          <p className="text-lg text-gray-600">
            Your trip to {bookingData.destination} is confirmed.
          </p>
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <p className="font-semibold text-green-800">Booking Reference: #TRV{Date.now().toString().slice(-8)}</p>
            <p className="text-green-700 mt-2">A confirmation email has been sent to {email}</p>
          </div>
          <button 
            onClick={onNavigate}
            className="w-full py-4 bg-black text-white font-bold text-base rounded-xl shadow-xl hover:bg-gray-800 transition-all"
          >
            View My Bookings
          </button>
        </div>
      )}

      {status === 'pending' && (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-16 h-16 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Payment Pending</h2>
          <p className="text-lg text-gray-600">
            Your payment is being processed by the bank.
          </p>
          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-xl p-6">
            <p className="font-semibold text-yellow-800">Our team will contact you shortly</p>
            <p className="text-yellow-700 mt-2">Reference: #TRV{Date.now().toString().slice(-8)}</p>
          </div>
          <button 
            onClick={onNavigate}
            className="w-full py-4 bg-black text-white font-bold text-base rounded-xl shadow-xl hover:bg-gray-800 transition-all"
          >
            View My Bookings
          </button>
        </div>
      )}

      {status === 'failed' && (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Payment Failed</h2>
          <p className="text-lg text-gray-600">
            We couldn&apos;t process your payment. Please try again.
          </p>
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
            <p className="text-red-700">Common reasons: Insufficient funds, incorrect card details, or bank restrictions</p>
          </div>
          <button
            onClick={onRetry}
            className="w-full py-4 bg-black text-white font-bold text-base rounded-xl shadow-xl hover:bg-gray-800 transition-all"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default StepConfirmation;