import React from "react";
import KoursairImage from "../Media/Images/KoursairImage";

interface DestinationHeroProps {
  heroImage: string;
  title: string;
  subtitle: string;
}

const DestinationHero: React.FC<DestinationHeroProps> = ({
  heroImage,
  title,
  subtitle,
}) => {
  return (
    <section className="relative h-[70vh] md:h-[60vh] overflow-hidden">
      <KoursairImage
        src={heroImage}
        alt={title}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center pt-10 md:pt-0">
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold font-alegreya mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-2xl font-normal">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default DestinationHero;
