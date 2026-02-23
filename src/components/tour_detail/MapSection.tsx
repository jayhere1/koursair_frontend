"use client";
import React from "react";
import dynamic from 'next/dynamic';

const ItineraryMap = dynamic(() => import('@/components/map/interactive_map'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 rounded-xl">
      Loading Map...
    </div>
  )
});

interface MapSectionProps {
  mapState: {
    lat: number;
    lng: number;
    zoom: number;
  };
  mapRoute: {
    lat: number;
    lng: number;
    title: string;
  }[];
}

const MapSection: React.FC<MapSectionProps> = ({ mapState, mapRoute }) => {
  return (
    <div className="lg:col-span-1 order-1 lg:order-2 lg:sticky lg:top-[120px] lg:h-[calc(100vh-140px)] space-y-6">
      <div className="w-full h-[400px] lg:h-full bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden relative z-0">
          <ItineraryMap 
              center={{ lat: mapState.lat, lng: mapState.lng }}
              zoom={mapState.zoom}
              route={mapRoute}
          />
      </div>
      <p className="text-sm text-gray-500 italic text-center hidden lg:block">
        The map follows your itinerary journey automatically.
      </p>
    </div>
  );
};

export default MapSection;