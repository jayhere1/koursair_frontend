"use client";

import React from "react";
import KoursairImage from "@/components/Media/Images/KoursairImage";

interface PageHeroProps {
  title: string;
  subheading?: string;
  imageSrc: string;
  imageAlt?: string;
}

const HeroBanner: React.FC<PageHeroProps> = ({
  title,
  subheading,
  imageSrc,
  imageAlt = "Page banner",
}) => {
  return (
    <div className="relative py-12 pt-16 sm:py-16 md:py-20 h-80 sm:h-85 md:h-94 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <KoursairImage
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center z-0"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Title */}
      <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl relative z-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-alegreya tracking-wide">
          {title}
        </h1>
        {subheading && (
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white/90">
            {subheading}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
