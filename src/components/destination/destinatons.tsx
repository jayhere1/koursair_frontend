"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import KoursairImage from '../Media/Images/KoursairImage';

// Grid layout pattern that repeats for a visually appealing bento grid
const GRID_PATTERNS = [
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-2",
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
];

interface DestinationItem {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  className: string;
}

// Hardcoded fallback destinations
const FALLBACK_DESTINATIONS: DestinationItem[] = [
  {
    id: 1,
    name: "Dubai",
    subtitle: "Luxury",
    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/BurjKhalifa.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 2,
    name: "Thailand",
    subtitle: "Wildlife",
    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/thailand/Thailand.jpg",
    className: "md:col-span-2 md:row-span-1"
  },
  {
    id: 3,
    name: "Bali",
    subtitle: "Paradise",
    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/bali/Bali.jpg",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 4,
    name: "Kenya",
    subtitle: "Safari",
    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/kenya.jpg",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    id: 5,
    name: "Tahiti",
    subtitle: "Tropical Escape",
    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/tihati/endless-summer/main1.jpg",
    className: "md:col-span-2 md:row-span-2"
  },
  {
    id: 6,
    name: "India",
    subtitle: "Spiritual Healing",
    image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/india/yoga-healing/day4-4.jpg",
    className: "md:col-span-1 md:row-span-2"
  },
  {
    id: 7,
    name: "Maldives",
    subtitle: "Tropical",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    className: "md:col-span-2 md:row-span-1"
  },
  {
    id: 8,
    name: "Greece",
    subtitle: "Islands",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    className: "md:col-span-1 md:row-span-2"
  },
  {
    id: 9,
    name: "Singapore",
    subtitle: "Urban",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    id: 10,
    name: "Turkey",
    subtitle: "Historic",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    className: "md:col-span-1 md:row-span-1"
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCmsDestinations(cmsData: any[]): DestinationItem[] {
  return cmsData.map((d, i) => ({
    id: d.id,
    name: d.title,
    subtitle: d.subtitle || d.continent || '',
    image: d.image || d.heroImage || '',
    className: GRID_PATTERNS[i % GRID_PATTERNS.length],
  }));
}

interface DestinationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cmsDestinations?: any[] | null;
}

const Destination = ({ cmsDestinations }: DestinationProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const router = useRouter();

  const destinations = cmsDestinations?.length
    ? mapCmsDestinations(cmsDestinations)
    : FALLBACK_DESTINATIONS;

  // Extract unique categories for the dropdown
  const categories = [...new Set(destinations.map((dest) => dest.subtitle).filter(Boolean))];

  // Filter destinations based on search query and category
  const filteredDestinations = destinations.filter((destination) =>
    (destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === '' || destination.subtitle === categoryFilter)
  );

  const clearSearch = () => {
    setSearchQuery('');
    setCategoryFilter('');
  };

  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <div
        className="relative py-12 pt-16 sm:py-16 md:py-20 h-80 sm:h-85 md:h-94 flex items-center justify-center overflow-hidden"
      >
        {/* Hero Image */}
        <div className="absolute inset-0">
          <KoursairImage
            src="https://koursair-media.s3.us-east-1.amazonaws.com/images/banners/destination_hero.jpg"
            alt="Destinations Hero"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center z-0"
          />
        </div>
        {/* Dark Overlay (Replaces linear-gradient) */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl relative z-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-alegreya font-bold mb-4 sm:mb-6 tracking-wide">
            Destinations
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 leading-relaxed opacity-90">
            Discover handpicked destinations where adventure meets luxury and memories are made to last a lifetime.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Destinations Grid Section */}
      <div className="py-12 sm:py-16 lg:py-20 bg-[#F4EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
              Our Destinations
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
              From tropical paradises to urban adventures, discover the world&apos;s most incredible destinations with Koursair.
            </p>
          </div>

          {/* Unified Search and Filter Bar */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex flex-col sm:flex-row max-w-3xl mx-auto bg-gradient-to-r from-white to-gray-50 rounded-full shadow-sm border border-gray-300 overflow-hidden">
              {/* Search Input */}
              <div className="relative flex-1 border-r border-gray-300">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations..."
                  aria-label="Search destinations by name or category"
                  className="w-3/4 px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 text-gray-500 bg-transparent focus:outline-none focus:ring-0 text-sm sm:text-base transition-all duration-300"
                />
                <svg
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-500 hover:text-primary hover:rotate-90 transition-all duration-200"
                    aria-label="Clear search"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="relative w-full sm:w-48">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filter destinations by category"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-500 bg-transparent focus:outline-none focus:ring-0 text-sm sm:text-base appearance-none transition-all duration-300"
                >
                  <option value="">Filter by category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

            </div>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[200px]">
              {filteredDestinations.map((destination) => (
                <button
                  type="button"
                  onClick={() => router.push(`/tour/${destination.name}`)}
                  key={destination.id}
                  aria-label={`Explore ${destination.name} — ${destination.subtitle}`}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-left ${destination.className}`}
                >
                  <KoursairImage
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
                    <div className="text-left">
                      <p
                        className="inline-block px-2 py-1 text-sm sm:text-sm md:text-base font-normal mb-1 sm:mb-2 italic bg-white/10 text-gray-100 w-fit rounded-xl font-alegreya"
                      >
                        {destination.subtitle}
                      </p>
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                        {destination.name}
                      </h3>
                    </div>
                  </div>

                  {/* Hover overlay with additional info */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <svg className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 mx-auto mb-2 sm:mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <p className="text-sm sm:text-sm md:text-base font-semibold">Explore {destination.name}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white rounded-lg shadow-sm p-6 sm:p-8 mx-auto max-w-md">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M12 12a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              <p className="text-sm sm:text-sm md:text-base text-gray-600">
                No destinations found matching your search.
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Try different search terms or clear the filters.
              </p>
              <button
                onClick={clearSearch}
                className="mt-4 px-4 py-2 text-sm sm:text-base font-semibold text-primary bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destination;
