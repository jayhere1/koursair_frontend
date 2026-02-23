import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import Support from "@/components/support/support";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | Koursair",
  description:
    "Get help with your Koursair bookings, trips, and account. Our support team is here to assist you.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen max-w-screen ">
      <main>
        <Navbar />
        <Support />
        <FooterSection />
      </main>
    </div>
  );
}