import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { DestinationData } from "@/types/destination";
import KoursairImage from "../Media/Images/KoursairImage";

interface DestinationToursProps {
  title: string;
  slug: string;
  tours: DestinationData["availableTours"];
}

const getTourCardDetails = (
  tour: DestinationData["availableTours"][number]
) => ({
  ...tour,
  category: "Luxury & Sightseeing",
  categoryColor:
    tour.slug === "dubai-luxury-adventure"
      ? "rgb(255, 165, 0)"
      : "rgb(0, 150, 136)",
  description:
    "Explore the very best of this destination with our signature package, tailored for maximum impact and enjoyment.",
  rating: 4.8,
  reviews: 450,
  dates: tour.dates || [],
});

const DestinationTours: React.FC<DestinationToursProps> = ({
  title,
  slug, 
  tours,
}) => {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-primary mb-12 text-center">
        Our Available {title.split(",")[0]} Tours
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        {tours.map((tour, index) => {
          const trip = getTourCardDetails(tour);

          return (
            <Link
              key={index}
              href={`/tour/${slug}/${trip.slug}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-42 md:w-50 h-50 sm:h-58 md:h-65 flex-shrink-0">
                  <KoursairImage
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold"
                    style={{ backgroundColor: trip.categoryColor }}
                  >
                    {trip.category}
                  </div>

                  {/* Heart icon */}
                  {/* <button className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                  </button> */}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6">
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-primary transition-colors">
                      {trip.title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                      {trip.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-100">
                    {/* Duration & Price */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base mb-1">
                        <Clock className="w-4 h-4" />
                        <span>{trip.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm sm:text-base">
                          From{" "}
                        </span>
                        <span className="text-xl md:text-2xl font-extrabold text-green-600">
                          ${trip.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm sm:text-base">
                          {" "}
                          /per person
                        </span>
                      </div>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <div className="px-3 py-1 rounded-full text-white text-sm font-bold bg-[#E87C3C]">
                        {trip.rating.toFixed(1)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 text-right">
                        <div className="font-medium">Superb</div>
                        <div>({trip.reviews} Reviews)</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row mt-3 gap-2">
                        {trip.dates.slice(0, 3).map((date, idx) => (
                          <span key={idx} className="text-gray-500 text-sm sm:text-sm">
                            {date}{idx < trip.dates.length - 1 ? " | " : ""}
                          </span>
                        ))}
                    </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DestinationTours;
