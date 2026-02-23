"use client";

import React, { useState, useRef } from "react";
import { Heart, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import KoursairImage from "../Media/Images/KoursairImage";
import { tours } from "@/constants/tours";


export default function PopularToursSection() {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  

  const handleTourClick = (slug: string, country: string) => {
    router.push(`/tour/${country}/${slug}`);
  };


  const scrollToCard = (index: number) => {
    if (sliderRef.current) {
      const cardContainer = sliderRef.current;
      // Get the target card element
      const targetCard = cardContainer.children[index] as HTMLElement;
      if (targetCard) {
        // Calculate the scroll position needed to bring the target card into view
        // Subtract padding/margin from cardContainer to accurately position it.
        const scrollPosition = targetCard.offsetLeft - cardContainer.offsetLeft;
        cardContainer.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? tours.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % tours.length;
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  // --- Render ---

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#fffafa] relative">
      <div className="max-w-8xl mx-auto lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary">
            Our Popular Tours
          </h2>
          {/* <div className="relative w-20 sm:w-24 md:w-[120px] h-[2px] top-1 bg-[#e1e1e1] mx-auto mb-4 sm:mb-6">
            <div className="absolute w-12 sm:w-14 md:w-[60px] h-[2px] bg-primary  left-1/2 -translate-x-1/2"></div>
          </div> */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
            Embark on unforgettable journeys with our expertly curated group tours.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-8xl mx-auto px-4 md:px-12">
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-scroll bg-[#fffafa] snap-x snap-mandatory py-15 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {tours.map((tour) => (
              <div
                key={tour.id}
                className={`flex-none w-[80vw] sm:w-[45vw] md:w-[350px] lg:w-[320px] rounded-lg border-1 border-primary overflow-hidden shadow-xl transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110 snap-start`}
                onClick={() => handleTourClick(tour.slug, tour.country)}
              >
                <div className="relative h-[200px] sm:h-[250px] overflow-hidden group">
                  <KoursairImage
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="category-badge px-3 py-1 text-xs font-semibold text-gray-700 rounded-full backdrop-blur bg-white/90">
                      {tour.category}
                    </span>
                  </div>

                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    onClick={(e) => e.stopPropagation()} 
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        tour.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[22px]  font-semibold text-primary mb-2 line-clamp-1">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 text-[15px] mb-4 line-clamp-2">
                    {tour.description}
                  </p>

                  {/* Duration and Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{tour.duration}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        From{" "}
                        <span className="text-[#c49c7a] font-semibold text-lg">
                          ${tour.price}
                        </span>{" "}
                        /per person
                      </p>
                    </div>
                  </div>

                  {/* Reviews and Rating */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Good</span>
                      <span className="mx-1">•</span>
                      <span>{tour.reviews} Reviews</span>
                    </div>
                    <div className="px-3 py-1 text-white font-semibold rounded bg-[#E87C3C] text-sm">
                      {tour.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden sm:flex absolute inset-x-0 top-1/2 transform -translate-y-1/2 justify-between px-2 sm:px-4 lg:px-8 z-40 pointer-events-none">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 border-2 border-gray-700 bg-white/50 rounded-full flex items-center justify-center transition-colors hover:bg-white shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-gray-700 w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          {/* Next Button */}
          <button
            onClick={handleNext}
            className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 border-2 border-gray-700 bg-white/50 rounded-full flex items-center justify-center transition-colors hover:bg-white shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="text-gray-700 w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}