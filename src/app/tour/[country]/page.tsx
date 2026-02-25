// app/[country]/[slug]/page.tsx

import DestinationPage from "@/components/destination/individual_destination";
import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import { DESTINATION_DATA } from "@/constants/destination";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Destination | Koursair",
  description:
    "Explore tours and travel experiences in this destination with Koursair. Discover trips, activities, and local highlights.",
};

// Function to fetch the trip data (simulated with local object)
const getTripData = (country: string): typeof DESTINATION_DATA[keyof typeof DESTINATION_DATA] | undefined => {
  return DESTINATION_DATA[country];
};

// ✅ Await params
const TripDestinationPage = async ({
  params,
}: {
  params: Promise<{ country: string }>;
}) => {
  const { country } = await params;

  const destinationData = getTripData(country);

  if (!destinationData) {
    return (
      <main>
        <Navbar />
        <div
          className="relative flex flex-col items-center justify-center text-center min-h-[80vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/landing/hero/bali_bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 text-white px-6 max-w-2xl">
            <h1 className="text-4xl font-semibold mb-6">
              New Adventures<br /> Coming Soon...
            </h1>
            <p className="text-lg text-gray-200 ">
              We&apos;re crafting breathtaking experiences and exclusive journeys.
              Stay tuned — your next destination awaits.
            </p>
            <Link href="/destinations" className="inline-block mt-6 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition">
              Back to Destinations
            </Link>
          </div>
        </div>
        <FooterSection />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <DestinationPage data={destinationData} />
      <FooterSection />
    </main>
  );
};

export default TripDestinationPage;
