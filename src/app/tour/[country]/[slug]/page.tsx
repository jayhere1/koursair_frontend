// app/[country]/[slug]/page.tsx

import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import TripDetailHero from "@/components/tour_detail/tour_hero";
import TripOverviewBooking from "@/components/tour_detail/tour_overview";
import { TOUR_DATA, TripData } from "@/types/tour";
import { redirect } from "next/navigation"; // 1. Import redirect

// Function to fetch the trip data (simulated with local object)
const getTripData = (slug: string): TripData | undefined => {
  return TOUR_DATA[slug];
};

// ✅ Await params
const TripDetailPage = async ({
  params,
}: {
  params: Promise<{ country: string; slug: string }>;
}) => {
  const { slug } = await params;

  // 2. Redirect Logic
  // This will instantly redirect the user to /Kenya (HTTP 307 Temporary Redirect)
  if (slug === "Kenya") {
    redirect("/Kenya"); 
  }

  const tripData = getTripData(slug);

  if (!tripData) {
    return (
      <main>
        <Navbar />
        <div
          className="relative flex flex-col items-center justify-center text-center min-h-[80vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/landing/hero/bali_bg.jpg')" }}
        >
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50"></div>
      
          <div className="relative z-10 text-white px-6 max-w-2xl">
            <h1 className="text-5xl font-semibold mb-6">
              New Adventures<br/> Coming Soon...
            </h1>
            <p className="text-xl text-gray-200 ">
              We’re crafting breathtaking experiences and exclusive journeys.  
              Stay tuned — your next trip awaits.
            </p>
          </div>
        </div>
        <FooterSection />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <TripDetailHero data={tripData} />
      <TripOverviewBooking data={tripData} />
      <FooterSection />
    </main>
  );
};

export default TripDetailPage;