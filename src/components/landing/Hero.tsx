"use client";

import React from "react";
import KoursairVideo from "../Media/Video/KoursaiVideo";

export default function HeroSection() {
 
  return (
    <section className="relative h-[97vh] overflow-hidden">
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
        <div className="text-white mt-[-95px] md:pt-0">
          <h2
            className="font-alegreya text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white sm:mb-6 inline-block relative 
                       after:content-[''] after:absolute after:bottom-0 after:right-[-2rem] sm:after:right-[-3rem] after:w-32 sm:after:w-40 after:h-[2px] after:bg-white italic"
          >
            The Ultimate Journey
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light">
            Your Adventure Starts Here
          </p>
        </div>
      </div>
     
    </section>
  );
}