"use client";

import React from "react";
import ReviewCard from "./ReviewCard";

type Review = {
  id: number;
  category: string;
  clientName: string;
  rating: number;
  comment: string;
  clientImage: string;
  tripTitle: string;
};

const ReviewsGrid = ({ reviews }: { reviews: Review[] }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">
          No reviews found for this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsGrid;
