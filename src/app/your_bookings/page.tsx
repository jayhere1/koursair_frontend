import YourBookings from "@/components/bookings/allbooking";
import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";

export default function DesinationPage() {
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