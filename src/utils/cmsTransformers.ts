import { ICON_PATHS } from "@/types/tour";
import type { DestinationData } from "@/types/destination";
import type { TripData, DestinationFacts } from "@/types/tour";
import type { Trip } from "@/types/trip";

/* eslint-disable @typescript-eslint/no-explicit-any */

function transformKeyFacts(raw: any): DestinationFacts {
  return {
    currency: { value: raw?.currency || "", iconPath: ICON_PATHS.CURRENCY },
    avgTemp: { value: raw?.avgTemp || "", iconPath: ICON_PATHS.TEMPERATURE },
    timezone: { value: raw?.timezone || "", iconPath: ICON_PATHS.TIMEZONE },
    language: { value: raw?.language || "", iconPath: ICON_PATHS.LANGUAGE },
  };
}

export function transformStrapiDestination(raw: any): DestinationData {
  return {
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle || "",
    continent: raw.continent || "",
    overview: raw.overview || "",
    whygo: raw.whygo || "",
    image: raw.image || "",
    heroImage: raw.heroImage || "",
    collageImages: raw.collageImages || [],
    keyFacts: transformKeyFacts(raw.keyFacts),
    highlights: (raw.highlights || []).map((h: any) => ({
      title: h.title,
      description: h.description,
      image: h.image || "",
    })),
    availableTours: (raw.tours || []).map((t: any) => ({
      title: t.title,
      slug: t.slug,
      type: t.type || "",
      duration: t.duration || "",
      description: t.listingDescription || "",
      price: t.price || 0,
      rating: t.rating || 0,
      reviews: t.reviewCount || 0,
      image: t.listingImage || "",
      dates: t.listingDates || [],
    })),
  };
}

export function transformStrapiTour(raw: any): TripData {
  return {
    slug: raw.slug,
    destination: raw.destination?.title || raw.destination?.slug || "",
    title: raw.title,
    duration: raw.duration || "",
    type: raw.type || "",
    images: raw.images || [],
    mapImageUrl: raw.mapImageUrl || "",
    facts: transformKeyFacts(raw.facts),
    bookingSection: {
      overview: {
        title: raw.overviewTitle || "",
        paragraphs: raw.overviewParagraphs || [],
      },
      keySellingPoints: (raw.keySellingPoints || []).map((ksp: any) => ({
        title: ksp.title,
        text: ksp.text,
        iconPath: ksp.iconPath || "",
      })),
      inclusions: raw.inclusions || [],
      exclusions: raw.exclusions || [],
      itinerary: (raw.itinerary || []).map((day: any) => ({
        day: day.day,
        title: day.title,
        images: day.images || [],
        activities: day.activities || [],
        coordinates:
          day.latitude && day.longitude
            ? { lat: day.latitude, lng: day.longitude }
            : undefined,
        zoom: day.zoom,
        subtitle: day.subtitle,
        accommodation: day.accommodation,
      })),
      reviews: (raw.reviews || []).map((r: any) => ({
        name: r.name,
        rating: r.rating,
        date: r.date,
        comment: r.comment,
      })),
      fixedDepartureDates: (raw.departureDates || []).map((d: any) => ({
        date: d.date,
        price: d.price,
        label: d.label,
      })),
      minDeposit: raw.minDeposit,
      contactNumber: raw.contactNumber || "",
    },
    overviewHtml: raw.overviewHtml || undefined,
    heroImage: raw.heroImage || undefined,
    highlightsBox: raw.highlightsBox
      ? {
          title: raw.highlightsBox.title,
          points: (raw.highlightsBox.points || []).map((p: any) => ({
            title: p.title,
            desc: p.desc,
          })),
        }
      : undefined,
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  HISTORIC: "#D4A574",
  SPIRITUAL: "#7FB069",
  MUSEUM: "#5B9BD5",
  WALKING: "#F4B41A",
  LUXURY: "#C9A96E",
  ADVENTURE: "#E07A5F",
  BEACHES: "#3AAFB9",
  CULTURAL: "#7B68EE",
  CULINARY: "#E6735A",
  WELLNESS: "#81B29A",
  "CITY BREAK": "#F2CC8F",
  BACKPACKING: "#A68A64",
};

export function transformStrapiToursToTrips(rawTours: any[]): Trip[] {
  return rawTours.map((t: any, index: number) => ({
    id: t.id || index + 1,
    title: t.title,
    description: t.listingDescription || "",
    slug: t.slug,
    country: t.destination?.slug || t.destination?.title?.toLowerCase() || "",
    image: t.listingImage || (t.images && t.images[0]) || "",
    category: (t.type || "").toUpperCase(),
    categoryColor: CATEGORY_COLORS[(t.type || "").toUpperCase()] || "#888888",
    price: t.price || 0,
    duration: t.duration || "",
    rating: t.rating || 0,
    reviews: t.reviewCount || 0,
  }));
}
