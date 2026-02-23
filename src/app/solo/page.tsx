import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import SoloTripsPage from "@/components/trips/solo";
import {soloCategories, soloFilters, soloTrips } from "@/constants/trip";

export default function GroupPage() {
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