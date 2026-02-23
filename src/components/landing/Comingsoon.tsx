"use client"
import React, { useState, useEffect } from "react";

const AIGroupingComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 78,
    hours: 34,
    minutes: 87,
    seconds: 55,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#13263e] border-t border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        
        {/* Left side: AI Icon + Heading */}
        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#F4EFE7] animate-pulse shadow-md">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-lg font-medium text-white">
            AI-Based Grouping <span className="text-[#F4EFE7]">Coming Soon</span>
          </h2>
        </div>

        {/* Countdown Timer */}
        <div className="flex space-x-2 sm:space-x-3 text-white font-semibold text-base sm:text-base">
          <div className="flex flex-col items-center">
            <span>{timeLeft.days.toString().padStart(2, "0")}</span>
            <span className="text-[10px] font-medium text-gray-200">Days</span>
          </div>
          <span>:</span>
          <div className="flex flex-col items-center">
            <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
            <span className="text-[10px] font-medium text-gray-200">Hrs</span>
          </div>
          <span>:</span>
          <div className="flex flex-col items-center">
            <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
            <span className="text-[10px] font-medium text-gray-200">Min</span>
          </div>
          <span>:</span>
          <div className="flex flex-col items-center">
            <span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
            <span className="text-[10px] font-medium text-gray-200">Sec</span>
          </div>
        </div>

        {/* Right Side: Call Info */}
        <div className="hidden md:block text-base font-medium text-gray-100">
          For Group Booking & Packages:{" "}
          <span className="font-semibold">1800-521-4263</span>
        </div>
      </div>
    </div>
  );
};

export default AIGroupingComingSoon;
