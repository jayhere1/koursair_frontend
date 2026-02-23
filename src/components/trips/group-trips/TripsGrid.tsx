"use client";

import KoursairImage from "@/components/Media/Images/KoursairImage";
import { Trip } from "@/types/trip";


interface Props {
  trips: Trip[];
  onTripClick: (slug: string, country: string) => void;
}

const TripsGrid = ({ trips, onTripClick }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 ">
      {trips.map(trip => (
        <div
          key={trip.id}
          onClick={() => onTripClick(trip.slug, trip.country)}
          className="bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 "
        >
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative w-full sm:w-42 md:w-50 h-50 sm:h-58 md:h-65 flex-shrink-0">
              <KoursairImage
                src={trip.image}
                alt={trip.title}
                fill
                className="object-cover object-center"
              />

              <div
                className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold"
                style={{ backgroundColor: trip.categoryColor }}
              >
                {trip.category}
              </div>

              {/* Heart icon */}
              <button
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 w-7 sm:w-8 h-7 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 hover:text-red-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 hover:underline cursor-pointer text-primary">
                {trip.title}
              </h3>

              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                {trip.description}
              </p>

              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div>
                  <span className="text-gray-500 text-sm sm:text-base">
                    From{" "}
                  </span>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#4CAF50]">
                    ${trip.price}
                  </span>
                  <span className="text-gray-500 text-sm sm:text-base">
                    {" "}
                    /per person
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base">
                  <svg
                    className="w-4 sm:w-5 h-4 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{trip.duration}</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-bold bg-[#E87C3C]">
                    {trip.rating}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    <div className="font-medium">Superb</div>
                    <div>{trip.reviews} Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripsGrid;
