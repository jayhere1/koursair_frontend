import React from "react";

interface DetailsReviewsSectionProps {
  inclusions: string[];
  exclusions: string[];
  reviews: { name: string; date: string; rating: number; comment: string }[];
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex text-yellow-500">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} className={`w-5 h-5 ${star <= rating ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.487 6.91l6.572-.955L10 0l2.941 5.955 6.572.955-4.758 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

const DetailsReviewsSection: React.FC<DetailsReviewsSectionProps> = ({ inclusions, exclusions, reviews }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 scroll-m-24">
      <div className="lg:col-span-1 space-y-10">
        <h2 className="text-4xl font-extrabold text-primary tracking-tight">What&apos;s Included</h2>
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8 border-t-4 border-primary">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {inclusions.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-700 mb-3 flex items-center gap-2"><span className="text-red-600">🚫</span> What&apos;s Not Covered</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-600 text-sm list-disc pl-5">
              {exclusions.map((exc, i) => <li key={i}>{exc}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 space-y-10">
        <h2 className="text-4xl font-extrabold text-primary tracking-tight">Guest Reviews (4.8 / 5)</h2>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-primary">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800 text-lg">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <StarRating rating={review.rating} />
              <p className="mt-3 text-gray-700 italic leading-relaxed">&quot;{review.comment}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsReviewsSection;