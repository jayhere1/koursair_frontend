import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import ReviewsPage from "@/components/reviews/review";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | Koursair",
  description:
    "Read traveler reviews and testimonials about Koursair trips. See what others have to say about their travel experiences.",
};

export default function ReviewsPageRoute() {
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