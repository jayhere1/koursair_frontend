import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import SoloTripsPage from "@/components/trips/solo";
import { soloCategories, soloFilters, soloTrips } from "@/constants/trip";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solo Trips | Koursair",
  description:
    "Discover solo travel adventures curated by Koursair. Explore the world on your own terms with expertly planned itineraries.",
};

export default function SoloPage() {
  return (
    <div className="min-h-screen max-w-screen ">
      <main>
        <Navbar />
        <SoloTripsPage trips={soloTrips}
          categories={soloCategories}
          filters={soloFilters}
        />
        <FooterSection />
      </main>
    </div>
  );
}