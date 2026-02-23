import Destination from "@/components/destination/destinatons";
import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations | Koursair",
  description:
    "Explore stunning travel destinations around the world with Koursair. Find your next group or solo adventure.",
};

export default function DesinationPage() {
  return (
    <div className="min-h-screen max-w-screen ">
      <main>
        <Navbar />
        <Destination />
        <FooterSection />
      </main>
    </div>
  );
}