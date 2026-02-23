
"use client";

import React from "react";
import KoursairImage from "@/components/Media/Images/KoursairImage";

const AboutContentSection = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-[#F4EFE7] px-4 sm:px-6 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          
          <div className="order-2 md:order-1 relative h-64 sm:h-80 md:h-96">
            <KoursairImage
              src="https://koursair-media.s3.us-east-1.amazonaws.com/images/others/about/about.jpg"
              alt="About Koursair"
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-700 rounded-xl"
            />
          </div>

            <div className="order-1 md:order-2 space-y-6 sm:space-y-8">
              <div className="space-y-2 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-primary">
                  At{" "}
                  <span className="font-semibold">
                    Koursair
                  </span>
                  , we reinvent group travel by combining unbeatable value
                  with unforgettable destinations. We curate high-energy,
                  stylish trips to the world&apos;s most iconic locations —
                  all designed for those who crave connection, adventure, and
                  effortless planning.
                </p>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-primary">
                  Our secret? We focus only on select destinations we know
                  inside and out. By securing large block bookings and
                  leveraging trusted local partners, we deliver premium group
                  travel experiences at prices no competitor can match.
                </p>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-primary">
                  Whether you&apos;re chasing sunsets in{" "}
                  <span className="font-semibold">Bali</span>, rooftop vibes
                  in <span className="font-semibold">Dubai</span>, or beach
                  bliss in <span className="font-semibold">Phuket</span> —
                  when you travel with Koursair, you travel better, together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AboutContentSection;

