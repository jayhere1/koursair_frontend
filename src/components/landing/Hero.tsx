"use client";

import React from "react";
import KoursairVideo from "../Media/Video/KoursaiVideo";

export default function HeroSection() {

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <KoursairVideo
          src="https://koursair-media.s3.us-east-1.amazonaws.com/videos/Koursair_Video.mp4"
          poster="https://koursair-media.s3.us-east-1.amazonaws.com/images/others/hero/bali_bg.jpg"
          fill
          className="object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-20 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="text-white space-y-6">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/70 font-medium">
            Essence of Refined Travel
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            The Ultimate{" "}
            <span className="text-white/80">Journey</span>
          </h2>
          <div className="w-12 h-[2px] bg-white/40 mx-auto" />
          <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide">
            Your Adventure Starts Here
          </p>
        </div>
      </div>

    </section>
  );
}
