"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  CloudSun,
  MapPin,
  CheckCircle,
  FileText,
  Globe,
  CalendarClock,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/landing/Footer";
import KoursairImage from "@/components/Media/Images/KoursairImage";
import { kenyaReunionAdventure } from "@/constants/kenya";
import { ItineraryItem } from "./ItineraryItem";
import { ItineraryMap } from "./RouteMapSection";
import { FactCard } from "./FactCard";
import Link from "next/link"; // Imported for navigation

const TripOverviewBooking = () => {
  // REMOVED: useProtectedPage (Moved to booking page)
  
  const [mapState, setMapState] = useState({
    lat: -1.2921,
    lng: 36.8219,
    zoom: 10,
  });

  const tripData = useMemo(() => kenyaReunionAdventure, []);
  const { destination, title, overview, heroImage, facts, bookingSection } = tripData;
  const { itinerary } = bookingSection;

  const mapRoute = useMemo(() => {
    return itinerary
      .filter((day) => day.coordinates && day.coordinates.lat && day.coordinates.lng)
      .map((day) => ({
        lat: day.coordinates!.lat,
        lng: day.coordinates!.lng,
        title: day.title.split(":")[0],
      }));
  }, [itinerary]);

  const handleDayVisibility = (
    coords: { lat: number; lng: number },
    zoom: number
  ) => {
    setMapState((prev) => {
      if (prev.lat === coords.lat && prev.lng === coords.lng && prev.zoom === zoom) {
        return prev;
      }
      return { ...coords, zoom };
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "itinerary",
      label: "Itinerary",
      icon: <MapPin className="w-4 h-4" />,
    },
    { id: "map", label: "Route Map", icon: <Globe className="w-4 h-4" /> },
    {
      id: "book-cta", // Updated ID
      label: "Book Now",
      icon: <CheckCircle className="w-4 h-4" />,
      isPrimary: true,
    },
  ];

  const factIcons: Record<string, React.ReactNode> = {
    currency: <DollarSign className="w-6 h-6" />,
    avgTemp: <CloudSun className="w-6 h-6" />,
    timezone: <Globe className="w-6 h-6" />,
    language: <MapPin className="w-6 h-6" />,
  };

  return (
    <main>
      <Navbar />
      
      <div className="relative min-h-screen bg-[#F4EFE7] pb-20">
        {/* 1. HERO SECTION */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <KoursairImage
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white max-w-5xl px-4 md:px-6">
              <h1 className="text-3xl md:text-6xl font-extrabold font-alegreya mb-4">
                {title}
              </h1>
              <p className="text-lg md:text-xl lg:text-3xl font-light">
                {destination}
              </p>

              <p className="mt-2 flex justify-center items-center gap-2 text-sm md:text-xl lg:text-lg font-medium text-white/90">
                <CalendarClock className="w-4 h-4" />
                {bookingSection.fixedDepartureDates?.[0]?.label}
              </p>
            </div>
          </div>
        </section>

        {/* Fact Cards */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24 -mt-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <FactCard icon={factIcons["currency"]} label="Currency" value={facts.currency.value} />
            <FactCard icon={factIcons["avgTemp"]} label="Avg Temp" value={facts.avgTemp.value} />
            <FactCard icon={factIcons["timezone"]} label="Focus" value="Luxury & Business" />
            <FactCard icon={factIcons["language"]} label="Language" value={facts.language.value} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 space-y-12 md:space-y-15 px-4 md:px-6">
          {/* Sticky Nav */}
          <div className="flex flex-wrap gap-2 md:gap-4 sticky top-[80px] z-30 py-4 px-0 bg-[#F4EFE7]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-bold shadow-md border-1 border-transparent transition duration-300 transform hover:scale-[1.02] whitespace-nowrap ${
                    item.isPrimary 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "text-gray-700 bg-white hover:bg-[#1b3658] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Overview Section */}
          <div id="overview" className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 scroll-mt-16">
            <div className="lg:col-span-3 space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight border-b-4 border-primary pb-3">
                Trip Overview
              </h2>
              <div
                className="text-gray-700 leading-relaxed text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: overview }}
              />

              <div className="bg-[#F4EFE7]/50 p-6 md:p-8 rounded-2xl border border-primary mt-6">
                <h3 className="font-bold text-lg md:text-xl mb-6 text-primary">
                  What&apos;s Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {bookingSection.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="leading-snug">{inc}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <h4 className="font-bold text-primary mb-2">
                    Cost Exclusions (Not Included):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bookingSection.exclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="leading-snug">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-primary">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                  {kenyaReunionAdventure.highlightsBox.title}
                </h3>
                <div className="space-y-4">
                  {kenyaReunionAdventure.highlightsBox.points.map((point, idx) => (
                    <div key={idx} className="flex gap-4 p-3 rounded-lg bg-gray-50">
                      <div className="bg-primary p-2 rounded-full h-min">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{point.title}</h4>
                        <p className="text-sm text-gray-600">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images Grid */}
              <div className="grid-cols-2 gap-2 h-100 rounded-2xl overflow-hidden shadow-lg hidden md:grid">
                 <div className="w-full h-[150px] relative">
                  <KoursairImage
                    src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/main1.jpg"
                    alt="Safari"
                    fill
                    className="object-cover hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="w-full h-[150px] relative">
                  <KoursairImage
                    src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/main3.jpg"
                    alt="Lion"
                    fill
                    className="object-cover hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="col-span-2 w-[462px] h-[257px]">
                  <KoursairImage
                    src="https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/kenya/main2.jpg"
                    alt="Mara"
                    fill
                    className="object-contain hover:scale-110 transition duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary & Map */}
          <div id="itinerary" className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 scroll-mt-32">
            <div className="lg:col-span-1 space-y-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                Detailed Itinerary
              </h2>
              <div className="relative border-l-4 border-primary ml-2 md:ml-4">
                {itinerary.map((day) => (
                  <ItineraryItem
                    key={day.day}
                    day={day}
                    onVisible={handleDayVisibility}
                  />
                ))}
              </div>
            </div>
            <div id="map" className="lg:col-span-1 sticky top-[100px] h-min space-y-6 scroll-mt-32">
              <h3 className="text-2xl font-bold text-primary border-b pb-2">
                Route Map
              </h3>
              <div className="h-[300px] md:h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative z-0">
                <ItineraryMap
                  center={{ lat: mapState.lat, lng: mapState.lng }}
                  zoom={mapState.zoom}
                  route={mapRoute}
                />
              </div>
              <p className="text-sm text-gray-500 italic text-center">
                Track your journey: Nairobi → Naivasha → Nakuru → Masai Mara.
              </p>
            </div>
          </div>

          {/* NEW CALL TO ACTION SECTION (Replaces the Form) */}
          <div id="book-cta" className="scroll-mt-32 py-7">
            <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Background Pattern/Texture Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-6 text-center md:text-left">
                <div className="space-y-4 max-w-xl">
                    <span className="inline-block px-4 py-1 bg-[#BAA68E] text-white text-sm font-bold rounded-full mb-2">
                        Limited Spots Available
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                        Ready for the <br/> <span className="text-[#BAA68E]">Kenya Reunion?</span>
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl">
                        Secure your spot for the adventure of a lifetime. Experience the wild, the luxury, and the memories waiting for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                        <div className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-5 h-5 text-[#BAA68E]" />
                            <span>Early Bird Rates Active</span>
                        </div>
                         <div className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-5 h-5 text-[#BAA68E]" />
                            <span>Easy Payment Plans</span>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <Link href="/booking/kenya" className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-[#1b3658] transition-all duration-200 bg-white font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-gray-100 hover:scale-105 shadow-xl">
                        Proceed to Booking
                        <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <p className="mt-4 text-sm text-white/60 text-center">
                        Secure SSL Payment • Family Options Available
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  );
};

export default TripOverviewBooking;