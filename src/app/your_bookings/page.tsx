import YourBookings from "@/components/bookings/allbooking";
import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Bookings | Koursair",
  description:
    "View and manage your Koursair trip bookings. Track upcoming adventures and review past travel details.",
};

export default function YourBookingsPage() {
  return (
    <div className="min-h-screen max-w-screen ">
      <main>
        <Navbar />
        <YourBookings/>
        <FooterSection />
      </main>
    </div>
  );
}