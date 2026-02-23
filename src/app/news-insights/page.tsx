"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/landing/Footer";
import NewsPage from "@/components/news/news";
import KoursairImage from "@/components/Media/Images/KoursairImage";

export default function NewsInsightsPage() {

  return (
    <div className="w-full">
          <Navbar />
    <div className="relative py-12 pt-16 sm:py-16 md:py-20 h-80 sm:h-85 md:h-94 flex items-center justify-center overflow-hidden">
                  {/* Hero Image */}
                  <div className="absolute inset-0">
                    <KoursairImage
                      src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/BaliResort.jpg"
                      alt="Destinations Hero"
                      fill
                      priority
                      className="object-cover object-center z-0"
                    />
                  </div>
                  {/* Dark Overlay (Replaces linear-gradient) */}
                  <div className="absolute inset-0 bg-black/50 z-10" />
                  <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl relative z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-alegreya lg:text-6xl font-bold mb-4 sm:mb-6 tracking-wide">
            News & Insights
          </h1>
        </div>
      </div>
      <NewsPage />
    <FooterSection/>
    </div>
  );
}