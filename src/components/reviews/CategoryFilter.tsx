"use client";

import React from "react";

type Props = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

const CategoryFilter = ({ categories, activeCategory, onChange }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-full cursor-pointer font-semibold text-sm sm:text-base transition-all duration-300 ${
            activeCategory === category
              ? "bg-primary text-white shadow-md"
              : "text-gray-700 bg-white hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {category} Trips
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
