import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import GroupTrips from "@/components/trips/group-trips/GroupTrips";
import { categories, filters, trips } from "@/constants/trip";
import { fetchAllTours } from "@/services/cmsApi";
import { transformStrapiToursToTrips } from "@/utils/cmsTransformers";
import type { Trip } from "@/types/trip";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Group Trips | Koursair",
  description:
    "Browse and book group travel experiences with Koursair. Travel together with friends, family, or new companions.",
};

export default async function GroupPage() {
  let tripList: Trip[] = trips;
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
        <GroupTrips
          trips={tripList}
          categories={categories}
          filters={filters}
        />
        <FooterSection />
      </main>
    </div>
  );
}