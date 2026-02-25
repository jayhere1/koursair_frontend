// app/thank-you/page.tsx
import React from "react";
import Link from "next/link";
import { CheckCircle, Home, ArrowRight } from "lucide-react";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* 1. Changed border-green-500 -> border-primary 
      */}
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-8 text-center space-y-6 border-t-8 border-primary">
        
        {/* Success Icon Wrapper */}
        <div className="flex justify-center">
          {/* 2. Changed bg-green-100 -> bg-orange-50 (Matches your "High Demand" stats bg)
          */}
          <div className="bg-gray-100 p-4 rounded-full animate-bounce-slow">
            {/* 3. Changed text-green-600 -> text-primary 
            */}
            <CheckCircle className="w-16 h-16 text-green-700" />
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Enquiry Received!
          </h1>
          <p className="text-gray-600 text-base">
            Thanks for reaching out. We have received your travel details safely.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500 border border-gray-200">
          <p>
            Our travel experts are reviewing your request. Expect a call or email from us within <span className="font-bold text-gray-800">24 hours</span> to finalize your adventure.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link 
            href="/" 
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link 
            href="/destinations" 
            /* 4. Changed bg-green-600 -> bg-primary
               5. Changed hover:bg-green-700 -> hover:bg-orange-600 (Matches your form button hover)
            */
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg transition-all"
          >
            Explore More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;