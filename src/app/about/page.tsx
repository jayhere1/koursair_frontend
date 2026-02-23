import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Koursair",
  description: "Modern Group & Solo Travel Company",
  keywords: [
    "Learn about Koursair",
    "modern travel company",
    "group travel experiences",
    "solo travel experiences",
    "premium curated trips",
    "trusted travel planning",
    "global travel destinations",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Koursair – Redefining Group & Solo Travel",
    description:
      "Learn about Koursair, a modern travel company offering premium group and solo travel experiences with curated trips, trusted planning, and global destinations.",
    url: "https://koursair.com/about",
    siteName: "Koursair",
    images: [
      {
        url: "https://koursair-media.s3.us-east-1.amazonaws.com/images/banners/about_hero.jpg",
        width: 1200,
        height: 630,
        alt: "About Koursair – Modern Group & Solo Travel",
      },
    ],
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
