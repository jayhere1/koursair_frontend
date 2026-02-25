"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const WhyChooseKoursair = () => {
  const Route =useRouter()
  return (
    <div className="w-full py-12 sm:py-16 lg:py-20 bg-[#F4EFE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
            Why Choose Koursair
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-lg md:max-w-3xl mx-auto">
            We reinvent group travel by combining unbeatable value with unforgettable destinations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Unbeatable Value */}
          <div className="text-center group">
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <div 
                className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3">Unbeatable Value</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Premium group travel experiences at prices no competitor can match through large block bookings and trusted partnerships.
            </p>
          </div>

          {/* Select Destinations */}
          <div className="text-center group">
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <div 
                className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3">Iconic Destinations</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We focus only on select destinations we know inside and out - from Bali sunsets to Dubai rooftops and Phuket beaches.
            </p>
          </div>

          {/* High-Energy Trips */}
          <div className="text-center group">
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <div 
                className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3">High-Energy Adventures</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Curated stylish trips designed for those who crave connection, adventure, and unforgettable experiences together.
            </p>
          </div>

          {/* Effortless Planning */}
          <div className="text-center group">
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <div 
                className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 9h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 16l2 2 4-4" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3">Effortless Planning</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Leave the stress behind. We handle all the details so you can focus on making memories with your group.
            </p>
          </div>

          {/* Trusted Partners */}
          <div className="text-center group">
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <div 
                className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3">Local Expertise</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Our trusted local partners ensure authentic experiences and insider access to the best each destination offers.
            </p>
          </div>

          {/* Group Connection */}
          <div className="text-center group">
            <div className="mb-4 sm:mb-5 md:mb-6 relative">
              <div 
                className="w-16 sm:w-18 md:w-20 h-16 sm:h-18 md:h-20 mx-auto bg-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3">Better Together</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              When you travel with Koursair, you don&apos;t just visit places - you create lasting bonds and share incredible moments.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <button onClick={() => Route.push('/destinations')}
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold bg-primary text-white text-sm sm:text-base transition-all duration-300 hover:shadow-xl cursor-pointer hover:scale-105 transform">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseKoursair;