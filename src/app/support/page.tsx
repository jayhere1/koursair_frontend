import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import Support from "@/components/support/support";

export default function commingsoon() {
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