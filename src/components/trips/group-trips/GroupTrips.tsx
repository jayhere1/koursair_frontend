"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import FilterTabs from "./FilterTabs";
import SearchBar from "./SearchBar";
import TripsGrid from "./TripsGrid";
import { Trip } from "@/types/trip";
import HeroBanner from "@/components/common/HeroBanner";

interface Props {
  trips:Trip[];
  categories: string[];
  filters: string[];
}

const GroupTrips = ({ trips, categories, filters }: Props) => {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
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
  }, [trips, searchTerm, location, category]);

  const handleTourClick = (slug: string, country: string) => {
    router.push(`/tour/${country}/${slug}`);
  };

  return (
    <div className="w-full">
      <HeroBanner
        title="Group Trips"
        subheading="Join like-minded travelers on curated adventures to the world&apos;s most incredible destinations."
        imageSrc="https://koursair-media.s3.us-east-1.amazonaws.com/images/banners/groupbanner.jpg"
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

export default GroupTrips;
