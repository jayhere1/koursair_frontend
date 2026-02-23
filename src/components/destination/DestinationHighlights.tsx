import React from "react";
import { DestinationData } from "@/types/destination";
import KoursairImage from "../Media/Images/KoursairImage";

interface DestinationHighlightsProps {
  highlights: DestinationData["highlights"];
}

const DestinationHighlights: React.FC<DestinationHighlightsProps> = ({
  highlights,
}) => {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-4xl font-bold text-primary mb-8 text-center">
        Main Attractions & Cultural Highlights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-xl border border-primary/10 group hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]"
          >
            <div className="relative h-56">
              <KoursairImage
                src={highlight.image}
                alt={highlight.title}
                fill
                className="object-cover rounded-t-xl"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-3 border-b border-gray-100 pb-2">
                {highlight.title}
              </h3>
              <p className="text-gray-600 ">
                {highlight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestinationHighlights;
