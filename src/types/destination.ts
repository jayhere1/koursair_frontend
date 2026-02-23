export interface DestinationData {
  slug: string;
  title: string;
  subtitle: string;
  continent: string;
  overview: string;
  whygo: string;
  image: string;
  heroImage: string;

  keyFacts: {
    currency: {
      value: string;
      iconPath: string;
      svgAttributes?: Record<string, unknown>;
    };
    avgTemp: {
      value: string;
      iconPath: string;
      svgAttributes?: Record<string, unknown>;
    };
    timezone: {
      value: string;
      iconPath: string;
      svgAttributes?: Record<string, unknown>;
    };
    language: {
      value: string;
      iconPath: string;
      svgAttributes?: Record<string, unknown>;
    };
  };

  availableTours: {
    title: string;
    slug: string;
    type: string;
    duration: string;
    description: string;
    rating: number;
    price: number;
    reviews: number;
    image: string;
    dates: string[];
  }[];
  highlights: { title: string; description: string; image: string }[];
  collageImages: string[];
}


