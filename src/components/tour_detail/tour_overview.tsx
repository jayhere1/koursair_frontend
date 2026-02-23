"use client";

import React, { useRef, useState, useMemo } from "react";
import { TripData } from "@/types/tour";
import TripTabs from "./NavigationTabs";
import OverviewSection from "./OverviewSection";
import BookingForm from "./BookingForm";
import ItinerarySection from "./ItinerarySection";
import MapSection from "./MapSection";
import DetailsReviewsSection from "./DetailsReviewSection";
import TermsSection from "./TermsSection";

interface TripOverviewBookingProps {
  data: TripData;
}

const TripOverviewBooking: React.FC<TripOverviewBookingProps> = ({ data }) => {
  const { title, bookingSection } = data;
  const { fixedDepartureDates, minDeposit, itinerary, inclusions, exclusions, keySellingPoints, reviews } = bookingSection;

  // --- REFS ---
  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);

  // --- MAP STATE ---
  const [mapState, setMapState] = useState({
    lat: itinerary[0]?.coordinates?.lat || 0,
    lng: itinerary[0]?.coordinates?.lng || 0,
    zoom: itinerary[0]?.zoom || 4
  });

  const mapRoute = useMemo(() => {
    return itinerary
      .filter((day: TripData["bookingSection"]["itinerary"][0]) => day.coordinates && day.coordinates.lat && day.coordinates.lng)
      .map((day: TripData["bookingSection"]["itinerary"][0]) => ({
        lat: day.coordinates!.lat,
        lng: day.coordinates!.lng,
        title: `Day ${day.day}`
      }));
  }, [itinerary]);

  const handleDayVisibility = (coords: { lat: number, lng: number }, zoom: number) => {
    setMapState((prev) => {
      if (prev.lat === coords.lat && prev.lng === coords.lng && prev.zoom === zoom) {
        return prev;
      }
      return { ...coords, zoom };
    });
  };

  return (
    <div className="relative py-12 sm:py-20 lg:py-24 bg-[#F4EFE7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-20">
        
        {/* Sticky Tabs */}
        <TripTabs refs={{ overview: overviewRef, itinerary: itineraryRef, details: detailsRef, terms: termsRef }} />

        {/* BLOCK 1: OVERVIEW & BOOKING */}
        <div ref={overviewRef} className="grid grid-cols-3 gap-12 scroll-m-24">
          <OverviewSection overview={bookingSection.overview} keySellingPoints={keySellingPoints} />
          <div className="col-span-3 lg:col-span-1">
            <BookingForm 
              title={title} 
              fixedDepartureDates={fixedDepartureDates} 
              minDeposit={minDeposit} 
            />
          </div>
        </div>

        {/* BLOCK 2: ITINERARY & MAP */}
        <div ref={itineraryRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 scroll-m-24">
          <ItinerarySection 
            durationString={data.duration} 
            itinerary={itinerary} 
            onDayVisible={handleDayVisibility} 
          />
          <MapSection mapState={mapState} mapRoute={mapRoute} />
        </div>

        {/* BLOCK 3: INCLUSIONS & REVIEWS */}
        <div ref={detailsRef}>
          <DetailsReviewsSection 
            inclusions={inclusions} 
            exclusions={exclusions} 
            reviews={reviews} 
          />
        </div>

        {/* BLOCK 4: TERMS */}
        <div ref={termsRef}>
          <TermsSection />
        </div>

      </div>
    </div>
  );
};

export default TripOverviewBooking;