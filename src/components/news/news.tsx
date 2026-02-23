"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import KoursairImage from "../Media/Images/KoursairImage";

export default function NewsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleNewsItemClick = (slug: string) => {
    router.push(`/news-insights/${slug}`);
  };

  const newsItems = [
    {
      id: 1,
      image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/news/bali_temple.jpg",
      date: "9",
      month: "Jan",
      author: "EMILY CHAN",
      publishDate: "January 9th 2026",
      title: "Exploring Bali's Hidden Temples",
      slug: "exploring-balis-hidden-temples",
      category: "Bali",
      description:
        "Join our group tour to discover Bali's lesser-known temples, tucked away in lush jungles and serene villages. Experience spiritual serenity and vibrant culture on this unforgettable journey.",
    },
    {
      id: 2,
      image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/destination/dubai/dubai2.jpg",
      date: "22",
      month: "Jan",
      author: "AMIR KHAN",
      publishDate: "January 22nd 2026",
      title: "Dune Adventures in Dubai",
      slug: "dune-adventures-in-dubai",
      category: "Dubai",
      description:
        "Embark on an exhilarating desert safari with our Dubai group tour. From dune bashing to stargazing, this trip offers the perfect blend of thrill and luxury.",
    },
    {
      id: 3,
      image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/news/news4.jpg",
      date: "15",
      month: "Dec",
      author: "SARAH LIN",
      publishDate: "December 15th 2025",
      title: "Island Hopping in Thailand",
      slug: "island-hopping-in-thailand",
      category: "Thailand",
      description:
        "Dive into Thailand's turquoise waters with our group island-hopping adventure. Explore Phuket, Krabi, and Koh Phi Phi, with vibrant coral reefs and stunning beaches awaiting.",
    },
    {
      id: 4,
      image: "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/news/bali_culinary.jpg",
      date: "10",
      month: "Jan",
      author: "JAMES PARK",
      publishDate: "January 10th 2026",
      title: "Bali's Culinary Journey",
      slug: "balis-culinary-journey",
      category: "Bali",
      description:
        "Savor the flavors of Bali on our group food tour. From street-side warungs to fine dining, experience the island's rich culinary heritage with fellow travel enthusiasts.",
    },
  ];

  const categories = ["All", "Bali", "Dubai", "Thailand"];

  const filteredNewsItems = selectedCategory === "All"
    ? newsItems
    : newsItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white">

      {/* Main Content Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Main Blog Area */}
          <div className="lg:col-span-4">
            {/* Category Filters */}
            <div className="mb-8 flex flex-wrap gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${selectedCategory === cat
                    ? "bg-primary text-white"
                    : "bg-[#e1e1e1] text-gray-800"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Section Header */}
            <div className="mb-10">
              <div className="relative inline-block mb-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
                  Travel Stories & Updates
                </h2>
                <div className="w-[100px] sm:w-[110px] md:w-[120px] h-[2px] bg-[#e1e1e1]">
                  <div className="w-[50px] sm:w-[55px] md:w-[60px] h-[2px] bg-primary"></div>
                </div>
              </div>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg md:max-w-2xl mt-4">
                Discover the latest adventures and insights from our group travel experiences across Bali, Dubai, and Thailand.
              </p>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 mb-10">
              {filteredNewsItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  onClick={() => handleNewsItemClick(item.slug)}
                >
                  {/* Image with Date Badge */}
                  <div className="relative w-full h-[220px] overflow-hidden">
                    {/* <Image
                      width={500}
                      height={300}
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    /> */}
                    <KoursairImage width={300} height={200} src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-center px-3 py-2 shadow-lg rounded-lg">
                      <div className="text-base font-semibold leading-none text-gray-900">
                        {item.date}
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {item.month}
                      </div>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      {item.category}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-3 flex items-center">
                      <span className="uppercase font-medium tracking-wide text-primary">
                        {item.author}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span>{item.publishDate}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <div className="mt-4 text-primary text-sm font-medium group-hover:underline">
                      Read More →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enquiry Form Sidebar */}
          <div className="lg:col-span-2 justify-end">
            <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-md h-fit w-[380px] sticky top-30">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Plan Your Next Adventure
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Curious about our group tours to Bali, Dubai, or Thailand? Submit your query, and our team will help you plan the perfect trip!
              </p>
              <form className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#beac92] focus:border-transparent bg-white"
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#beac92] focus:border-transparent bg-white"
                    placeholder="Your Email Address"
                  />
                </div>
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Destination
                  </label>
                  <select
                    id="destination"
                    className="w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#beac92] focus:border-transparent bg-white"
                  >
                    <option value="">Select a Destination</option>
                    <option value="Bali">Bali</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Thailand">Thailand</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Query
                  </label>
                  <textarea
                    id="query"
                    rows={5}
                    className="w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#beac92] focus:border-transparent bg-white resize-none"
                    placeholder="Tell us about your trip preferences or questions"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-md cursor-pointer hover:bg-[#a0927e] transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}