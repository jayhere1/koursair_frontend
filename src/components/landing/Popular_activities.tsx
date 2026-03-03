"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import KoursairImage from '../Media/Images/KoursairImage';
import { activities } from '@/constants/activities';

const PopularActivitiesSection = () => {
  const router = useRouter();

  return (
    <div className="w-full py-10 sm:py-16 lg:py-20 bg-[#F4EFE7] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Popular Destinations
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
            Discover our handpicked destinations where adventure meets luxury and memories are made.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">

          {/* First Row - 3 cards */}
          {activities.slice(0, 3).map((activity, index) => (
            <button
              key={activity.id}
              type="button"
              className={`relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl rounded-xl transition-all duration-500 transform hover:scale-105 text-left ${
                index === 1 ? 'md:col-span-2' : 'md:col-span-1'
              } h-[300px] sm:h-[330px] md:h-[370px]`}
              onClick={() => router.push(`/tour/${activity.title}`)}
              aria-label={`Explore ${activity.title} — ${activity.subtitle}`}
            >
              <KoursairImage
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
                <div className="text-left">
                  <div className="text-sm sm:text-sm md:text-base text-[#F4EFE7] font-normal mb-1 sm:mb-2 italic">
                    {activity.subtitle}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 opacity-90">
                    {activity.description}
                  </p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}

          {/* Second Row - 2 cards spanning wider */}
          <div className="md:col-span-2">
            <button
              type="button"
              className="relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl rounded-xl transition-all duration-500 transform hover:scale-105 h-[300px] sm:h-[330px] md:h-[370px] w-full text-left"
              onClick={() => router.push(`/tour/${activities[3].title}`)}
              aria-label={`Explore ${activities[3].title} — ${activities[3].subtitle}`}
            >
              <KoursairImage
                src={activities[3].image}
                alt={activities[3].title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 " />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
                <div className="text-left">
                  <p className="text-sm sm:text-sm md:text-base text-[#F4EFE7] font-normal mb-1 sm:mb-2 italic">
                    {activities[3].subtitle}
                  </p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                    {activities[3].title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 opacity-90">
                    {activities[3].description}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl rounded-xl transition-all duration-500 transform hover:scale-105 h-[300px] sm:h-[330px] md:h-[370px] w-full text-left"
              onClick={() => router.push(`/tour/${activities[4].title}`)}
              aria-label={`Explore ${activities[4].title} — ${activities[4].subtitle}`}
            >
              <KoursairImage
                src={activities[4].image}
                alt={activities[4].title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/60 to-black/30" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
                <div className="text-left">
                  <p className="text-sm sm:text-sm md:text-base text-[#F4EFE7] font-normal mb-1 sm:mb-2 italic">
                    {activities[4].subtitle}
                  </p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                    {activities[4].title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 opacity-90">
                    {activities[4].description}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularActivitiesSection;
