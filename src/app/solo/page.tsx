import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import SoloTripsPage from "@/components/trips/solo";
import { soloCategories, soloFilters, soloTrips } from "@/constants/trip";
import { fetchAllTours } from "@/services/cmsApi";
import { transformStrapiToursToTrips } from "@/utils/cmsTransformers";
import type { Trip } from "@/types/trip";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solo Trips | Koursair",
  description:
    "Discover solo travel adventures curated by Koursair. Explore the world on your own terms with expertly planned itineraries.",
};

export default async function SoloPage() {
  let tripList: Trip[] = soloTrips;
  try {
    const raw = await fetchAllTours();
    if (raw && raw.length > 0) {
      tripList = transformStrapiToursToTrips(raw);
    }
  } catch {
    // CMS unavailable, fall through to constant fallback
  }

  return (
    <div className="min-h-screen max-w-screen ">
      <main>
        <Navbar />
        <SoloTripsPage
          trips={tripList}
          categories={soloCategories}
          filters={soloFilters}
        />
        <FooterSection />
      </main>
    </div>
  );
}