"use client";

import React from "react";
import { Heart, Clock, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import KoursairImage from "../Media/Images/KoursairImage";
import { tours } from "@/constants/tours";

export default function PopularToursSection() {
  const router = useRouter();

 const handleTourClick = (slug: string, country: string) => {
  if (country.toLowerCase() === "kenya") {
    router.push("/tour/Kenya");
    return;
  }

  router.push(`/tour/${country}/${slug}`);
};


  const visibleTours = tours.slice(0, 3);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#fffafa]">
      <div className="max-w-8xl mx-auto lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary">
            Our Popular Tours
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
            Embark on unforgettable journeys with our expertly curated group tours.
          </p>
        </div>

        {/* Cards Container */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTours.map((tour) => (
              <div
                key={tour.id}
                className="w-[400px] rounded-lg border border-primary overflow-hidden shadow-xl transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110"
                onClick={() => handleTourClick(tour.slug, tour.country)}
              >
                {/* Image */}
                <div className="relative h-[200px] sm:h-[350px] overflow-hidden group">
                  <KoursairImage
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Category */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold text-gray-700 rounded-full backdrop-blur bg-white/90">
                      {tour.category}
                    </span>
                  </div>

                  {/* Like */}
                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart
                      className={`w-5 h-5 ${tour.isLiked
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                        }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[22px] font-semibold text-primary mb-2 capitalize ">
                    {tour.title}
                  </h3>
                 {tour.dates &&( <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{tour.dates}</span>
                  </div>)}
                  {/* <p className="text-gray-600 text-[15px] mb-4 line-clamp-2">
                    {tour.description}
                  </p> */}

                  {/* Duration & Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{tour.duration}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                     
                      <span className="text-[#c49c7a] font-semibold text-lg">
                        ${tour.price}
                      </span>{" "}
                      /per person
                    </p>
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
  <div className="flex items-center text-sm text-gray-600">
    <span className="font-medium">Good</span>
    {/* <span className="mx-1">•</span>
    <span>{tour.reviews} Reviews</span> */}
  </div>

  {/* Pill Badge */}
  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#E87C3C] border border-orange-100">
    {/* SVG Star Icon */}
    <svg className="w-4 h-4 text-orange-50 fill-current" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
    
    <div className="flex items-baseline gap-0.5">
      <span className="text-sm font-bold text-white">
        {tour.rating.toFixed(1)}
      </span>
      <span className="text-[10px] text-gray-50 font-medium">
        /5
      </span>
    </div>
  </div>
</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
