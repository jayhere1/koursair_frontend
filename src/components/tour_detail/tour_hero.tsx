// components/TripDetailHero.tsx (UPDATED TO RENDER ICONS CORRECTLY)

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { TripData } from "@/types/tour"; 
import KoursairImage from "../Media/Images/KoursairImage";

// Define props for the component
interface TripDetailHeroProps {
  data: TripData;
}

const TripDetailHero: React.FC<TripDetailHeroProps> = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Memoize data for stability
  const images = useMemo(() => data.images, [data.images]);
  const { title, duration, type, facts } = data;

  // Auto image change every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Helper function to render SVG icons from path data (Handles compound paths)
  const RenderIcon: React.FC<{ path: string }> = ({ path }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {/* Timezone (M12 2a10...): circle + path */}
      {path.includes("M12 2a10") ? (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </>
      ) : path.includes("M2 12h20") ? (
        // Language (M2 12h20...): circle + paths
         <>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
         </>
      ) : (
        // Default: Single path (Currency, Temperature, etc.)
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
          d={path}
        />
      )}
    </svg>
  );

  return (
    <section className="relative">
      {/* Hero Image Gallery */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[90vh] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <KoursairImage
        src={image}
        alt={title}
        fill
        sizes="90vw 90vh"
        className="object-cover w-full h-full"/>
          </div>
        ))}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Image Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "w-6 sm:w-8 bg-white"
                  : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tour Info Card */}
      <div className="relative -mt-16 sm:-mt-62 md:-mt-65 lg:-mt-34 xl:-mt-34 sm:px-6 lg:px-8 z-35">
        <div className="rounded-2xl shadow-2xl px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-6 bg-white/95 backdrop-blur-lg mx-auto max-w-7xl lg:h-34">
          {/* Title and Description */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {duration} of {type}
              </p>
            </div>

            {/* Destination Facts - Dynamically rendered */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(facts).map(([key, fact]) => (
                <div key={key} className="group">
                  <div className="flex items-center space-x-3 group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#F4EFE7]">
                      <RenderIcon path={fact.iconPath} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 capitalize">
                        {/* Custom label formatting */}
                        {key === 'avgTemp' ? 'Avg Temp' : key.replace(/([A-Z])/g, ' $1')}
                      </p>
                      <p className="font-semibold text-primary">{fact.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripDetailHero;