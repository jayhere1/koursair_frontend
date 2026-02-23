"use client";

import PhilosophySection from "@/components/about/our_philosophy";
import FooterSection from "@/components/landing/Footer";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/common/HeroBanner";
import AboutContentSection from "@/components/about/ContentSection";

const AboutContent = () => {
  return (
    <div className="w-full">
      <Navbar />

      <HeroBanner
        title="About Koursair – Redefining Group & Solo Travel"
        imageSrc="https://koursair-media.s3.us-east-1.amazonaws.com/images/banners/about_hero.jpg"
      />
      <AboutContentSection />
      <PhilosophySection />
      <FooterSection />
    </div>
  );
};

export default AboutContent;
