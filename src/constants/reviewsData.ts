
export type Review = {
  id: number;
  category: string;
  clientName: string;
  rating: number;
  comment: string;
  clientImage: string;
  tripTitle: string;
};

export const reviewsData: Review[] = [
  {
    id: 1,
    category: "GROUP",
    clientName: "Ava Mitchell",
    rating: 5,
    comment:
      "Traveling felt like stepping into a dream. Every moment was thoughtfully planned and full of wonder. We can't wait to book again!",
    clientImage:
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/reviews/1.jpg",
    tripTitle: "Dubai Luxury Experience",
  },
  {
    id: 2,
    category: "GROUP",
    clientName: "Liam Carter",
    rating: 5,
    comment:
      "The perfect blend of culture, adventure, and comfort. Koursair took my journey to a whole new level.",
    clientImage:
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/reviews/2.jpg",
    tripTitle: "Bali Adventure",
  },
  {
    id: 3,
    category: "SOLO",
    clientName: "Ella Bennett",
    rating: 5,
    comment:
      "I never imagined I'd experience such authentic local life while still feeling completely at ease. Truly unforgettable.",
    clientImage:
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/reviews/3.jpg",
    tripTitle: "Kyoto Cultural Immersion",
  },
  {
    id: 4,
    category: "SOLO",
    clientName: "Noah Sinclair",
    rating: 5,
    comment:
      "From boutique stays to immersive experiences, Koursair delivered magic at every turn. I can't wait to go again.",
    clientImage:
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/reviews/4.jpg",
    tripTitle: "Icelandic Ring Road Expedition",
  },
  {
    id: 5,
    category: "HONEYMOON",
    clientName: "Sarah & Mark",
    rating: 5,
    comment:
      "Our honeymoon was a dream come true. Pure romance and luxury. We couldn't have asked for a more perfect trip!",
    clientImage:
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/reviews/5.jpg",
    tripTitle: "Maldives Romantic Getaway",
  },
  {
    id: 6,
    category: "GROUP",
    clientName: "Grace K.",
    rating: 4,
    comment: "Fantastic trip. We visited the most iconic spots.",
    clientImage:
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/reviews/6.jpg",
    tripTitle: "Thailand Tour",
  },
  {
    id: 7,
    category: "SOLO",
    clientName: "Tom H.",
    rating: 3,
    comment: "Good value, but itinerary was too rushed.",
    clientImage:
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/reviews/7.jpg",
    tripTitle: "City Break",
  },
  {
    id: 8,
    category: "HONEYMOON",
    clientName: "Ben W.",
    rating: 4,
    comment: "Amazing experience with Koursair! Smooth booking, great support, and a perfectly planned trip.",
    clientImage:
      "https://koursair-media.s3.us-east-1.amazonaws.com/images/others/reviews/8.jpg",
    tripTitle: "Paris Romance",
  },
];


export const getRatingDistribution = (reviews: Review[]) => {
  const distribution: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    distribution[review.rating]++;
  });

  const totalCount = reviews.length;

  const percentages: Record<number, number> = {};
  Object.keys(distribution).forEach((key) => {
    percentages[Number(key)] =
      totalCount > 0 ? (distribution[Number(key)] / totalCount) * 100 : 0;
  });

  return { distribution, percentages, totalCount };
};
