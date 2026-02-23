"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import KoursairImage from "../Media/Images/KoursairImage";
import { newsItems } from "@/constants/newsItems";

export default function NewsEventsSection() {
  const router = useRouter();
  const handleNewsItemClick = (slug: string) => {
    router.push(`/news-insights/${slug}`);
  };
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#fffafa]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-12 md:px-16 lg:px-24 xl:px-28">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <div className="relative inline-block mb-2">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-primary">
              News & Insights
            </h2>
            {/* <div className="w-[100px] sm:w-[110px] md:w-[120px] h-[2px] bg-[#e1e1e1]">
              <div className="w-[50px] sm:w-[55px] md:w-[60px] h-[2px] bg-primary"></div>
            </div> */}
          </div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg md:max-w-2xl mt-4 sm:mt-5 md:mt-6">
            Discover the latest adventures and insights from our group travel experiences across Bali, Dubai, and Thailand.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-10 sm:mb-12">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start group cursor-pointer"
              onClick={() => handleNewsItemClick(item.slug)}
            >
              {/* Image with Date Badge */}
              <div className="relative w-full sm:w-[220px] sm:min-w-[220px] md:w-[260px] md:min-w-[260px] h-[180px] sm:h-[180px] md:h-[200px] overflow-hidden rounded">
                <div className="relative w-full h-full">
                  <KoursairImage
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-0 right-0 bg-primary text-center px-2 py-1 shadow-md">
                  <div className="text-sm sm:text-base font-semibold leading-none text-white">
                    {item.date}
                  </div>
                  <div className="text-xs font-medium text-gray-100">
                    {item.month}
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                  <span className="uppercase font-medium tracking-wide">
                    {item.author}
                  </span>
                  <span className="mx-2">-</span>
                  <span>{item.publishDate}</span>
                </div>
                <h3 className="text-base sm:text-lg md:text-2xl font-bold text-primary mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/news-insights"  className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold bg-primary text-white text-base sm:text-lg transition-all duration-300 hover:shadow-xl cursor-pointer hover:scale-105 transform">
            Explore more Insights
          </Link>
        </div>
      </div>
    </section>
  );
}