import FooterSection from "@/components/landing/Footer";
import HeroSection from "@/components/landing/Hero";
import NewsEventsSection from "@/components/landing/Insights";
import PopularActivitiesSection from "@/components/landing/Poplular_activities";
import PopularToursSection from "@/components/landing/Populartour";
import TestimonialsSection from "@/components/landing/Testimonials";
import WhyChooseKoursair from "@/components/landing/Whyus";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen ">
      <main>
        <Navbar />
        <HeroSection />
        <PopularToursSection />
        {/* <AIGroupingComingSoon /> */}
        <WhyChooseKoursair />
        <PopularActivitiesSection />
        <NewsEventsSection />
        <TestimonialsSection />
        <FooterSection />
        </main>
    </div>
  );
}
