import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import GroupTrips from "@/components/trips/group-trips/GroupTrips";
import { categories, filters, trips } from "@/constants/trip";

export default function GroupPage() {
  return (
    <div className="min-h-screen max-w-screen ">
      <main>
        <Navbar />
        <GroupTrips       trips={trips}
        categories={categories}
        filters={filters}
      />
        <FooterSection />
      </main>
    </div>
  );
}