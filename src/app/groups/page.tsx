import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import GroupTrips from "@/components/trips/group-trips/GroupTrips";
import { categories, filters, trips } from "@/constants/trip";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Group Trips | Koursair",
  description:
    "Browse and book group travel experiences with Koursair. Travel together with friends, family, or new companions.",
};

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