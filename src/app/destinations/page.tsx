import Destination from "@/components/destination/destinatons";
import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import { fetchAllDestinations } from "@/services/cmsApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations | Koursair",
  description:
    "Explore stunning travel destinations around the world with Koursair. Find your next group or solo adventure.",
};

export default async function DestinationPage() {
  let cmsDestinations = null;
  try {
    cmsDestinations = await fetchAllDestinations();
  } catch {
    // CMS unavailable — component will use hardcoded fallback
  }

  return (
    <div className="min-h-screen max-w-screen ">
      <main>
        <Navbar />
        <Destination cmsDestinations={cmsDestinations} />
        <FooterSection />
      </main>
    </div>
  );
}
