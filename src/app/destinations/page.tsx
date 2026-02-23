import Destination from "@/components/destination/destinatons";
import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";

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