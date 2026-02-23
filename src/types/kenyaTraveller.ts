export type ItineraryDay = {
  day: number;
  title: string;
  subtitle: string;
  activities: string[];
  accommodation?: string;
  images?: string[];
  coordinates?: { lat: number; lng: number };
  zoom?: number;
};

