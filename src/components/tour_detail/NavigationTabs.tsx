import React from "react";

interface TripTabsProps {
  refs: {
    overview: React.RefObject<HTMLDivElement | null>;
    itinerary: React.RefObject<HTMLDivElement | null>;
    details: React.RefObject<HTMLDivElement | null>;
    terms: React.RefObject<HTMLDivElement | null>;
  };
}

const TripTabs: React.FC<TripTabsProps> = ({ refs }) => {
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const topOffset = ref.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const tabs = [
    { label: "Overview & Booking", ref: refs.overview },
    { label: "Itinerary & Map", ref: refs.itinerary },
    { label: "Details & Reviews", ref: refs.details },
    { label: "Full Terms", ref: refs.terms },
  ];

  return (
    <div className="flex flex-wrap gap-4 sticky top-[80px] bg-[#F4EFE7] z-30 py-4 px-0">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => scrollToSection(tab.ref)}
          className="px-6 py-2 rounded-full cursor-pointer font-bold text-gray-700 bg-white shadow-md hover:bg-[#1b3658] hover:text-white transition duration-300 transform hover:scale-[1.02]"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TripTabs;