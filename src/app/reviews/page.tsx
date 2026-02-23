import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import ReviewsPage from "@/components/reviews/review";

export default function GroupPage() {
  return (
    <div className="min-h-screen max-w-screen ">
      <main>
        <Navbar />
        <ReviewsPage />
        <FooterSection />
      </main>
    </div>
  );
}