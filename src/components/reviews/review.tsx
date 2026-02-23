"use client";

import React, { useState } from "react";
import HeroBanner from "../common/HeroBanner";
import CategoryFilter from "../reviews/CategoryFilter";
// import ReviewsGrid from "../reviews/ReviewsGrid";
import OverallReviewsSummary from "../reviews/OverallReviewsSummary";
import ReviewsGrid from "./ReviewGrid";
import { getRatingDistribution, reviewsData } from "@/constants/reviewsData";


const ReviewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Group", "Solo", "Honeymoon"];

  const filteredReviews =
    activeCategory === "All"
      ? reviewsData
      : reviewsData.filter(
          (review) => review.category === activeCategory.toUpperCase()
        );

  const { distribution, percentages, totalCount } =
    getRatingDistribution(reviewsData);

  const excellentGoodCount = distribution[5] + distribution[4];
  const overallSuccessRate =
    totalCount > 0 ? ((excellentGoodCount / totalCount) * 10).toFixed(0) : 0;

  return (
    <div className="w-full">
      <HeroBanner
        title="Client Reviews"
        subheading="Hear what our happy travelers have to say about their unforgettable journeys."
        imageSrc="https://koursair-media.s3.us-east-1.amazonaws.com/images/banners/review_hero.jpg"
      />

      <div className="py-12 sm:py-16 lg:py-20 bg-[#F4EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <OverallReviewsSummary
            distribution={distribution}
            percentages={percentages}
            overallSuccessRate={overallSuccessRate}
          />

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          <ReviewsGrid reviews={filteredReviews} />
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
