"use client";

import React from "react";
import KoursairImage from "../Media/Images/KoursairImage";

type Review = {
  id: number;
  category: string;
  clientName: string;
  rating: number;
  comment: string;
  clientImage: string;
  tripTitle: string;
};

const renderSolidStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-5 h-5 fill-current ${
          i <= rating ? "text-yellow-500" : "text-gray-300"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.487 6.91l6.572-.955L10 0l2.941 5.955 6.572.955-4.758 4.635 1.123 6.545z" />
      </svg>
    );
  }
  return <div className="flex text-sm sm:text-base gap-0.5">{stars}</div>;
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <KoursairImage
        src={review.clientImage}
        alt={review.clientName}
        fill
        className="filter brightness-75 object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-5 text-white">
        <div className="absolute top-5 left-5">
          {renderSolidStars(review.rating)}
        </div>

        <div className="mb-4 text-3xl opacity-80">&ldquo;</div>

        <p className="text-base font-medium leading-relaxed mb-4">
          {review.comment}
        </p>

        <p className="text-xl font-bold">{review.clientName}</p>
        <p className="text-xs opacity-70">
          ({review.category.toLowerCase()} traveler)
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
