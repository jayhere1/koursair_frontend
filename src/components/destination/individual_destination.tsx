"use client";

import React from "react";
import { DestinationData } from "@/types/destination";
import DestinationHero from "./DestinationHero";
import DestinationKeyFacts from "./DestinationKeyFacts";
import DestinationTours from "./DestinationTours";
import DestinationOverview from "./DestinationOverview";
import DestinationHighlights from "./DestinationHighlights";

interface DestinationPageProps {
  data: DestinationData;
}



const DestinationPage: React.FC<DestinationPageProps> = ({ data }) => {
  return (
    <main className="min-h-screen bg-[#F4EFE7]">
      {/* Hero Section */}
      <DestinationHero
        heroImage={data.heroImage}
        title={data.title}
        subtitle={data.subtitle}
      />

      <div className="container max-w-7xl mx-auto px-4 md:px-8 -mt-20 z-10 relative pb-20">
        {/* Key Facts Bar */}
        <DestinationKeyFacts keyFacts={data.keyFacts} />

        {/* Available Tours Section */}
        <DestinationTours
          title={data.title}
          slug={data.slug}
          tours={data.availableTours}
        />

        {/* Overview and Why Go Section */}
        <DestinationOverview
          title={data.title}
          overview={data.overview}
          whygo={data.whygo}
          image={data.image}
          collageImages={data.collageImages}
        />

        {/* Main Attractions / Highlights */}
        <DestinationHighlights highlights={data.highlights} />
      </div>
    </main>
  );
};

export default DestinationPage;
