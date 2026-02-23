"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HeroBanner from "../common/HeroBanner";
import FilterTabs from "./group-trips/FilterTabs";
import SearchBar from "./group-trips/SearchBar";
import TripsGrid from "./group-trips/TripsGrid";
import { Trip } from "@/types/trip";
interface Props {
  trips:Trip[];
  categories: string[];
  filters: string[];
} 
const SoloTripsPage = ({ trips, categories, filters }: Props) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");
  const router = useRouter();

  const handleTourClick = (slug: string, country: string) => {
    router.push(`/tour/${country}/${slug}`);
  };



  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      location === "" ||
      trip.country.toLowerCase().includes(location.toLowerCase());
    const matchesCategory =
      category === "All Categories" || trip.category === category;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="w-full">
      <HeroBanner
        title="Solo Adventures"
        subheading="Design your own journey. Explore the world on your terms with
            confidence and freedom."
        imageSrc="https://koursair-media.s3.us-east-1.amazonaws.com/images/banners/solobanner.jpg"
      />

      <div className="py-12 sm:py-16 lg:py-20 bg-[#F4EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
         <FilterTabs
          filters={filters}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />

         <SearchBar
          searchTerm={searchTerm}
          location={location}
          category={category}
          categories={categories}
          onSearchChange={setSearchTerm}
          onLocationChange={setLocation}
          onCategoryChange={setCategory}
        />

           <TripsGrid trips={filteredTrips} onTripClick={handleTourClick} />
        </div>
      </div>
    </div>
  );
};

export default SoloTripsPage;
