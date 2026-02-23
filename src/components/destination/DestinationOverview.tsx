import React from "react";
import { Check } from "lucide-react";
import KoursairImage from "../Media/Images/KoursairImage";

interface DestinationOverviewProps {
  title: string;
  overview: string;
  whygo: string;
  image?: string;
  collageImages?: string[];
}

const DestinationCollage: React.FC<{ images: string[] }> = ({ images }) => (
  <div className="grid grid-cols-2 grid-rows-3 gap-2 h-full w-full">
    <div className="col-span-1 row-span-2 relative">
      <KoursairImage
        src={images[0]}
        alt="Collage Image 1"
        fill
        className="object-cover rounded-tl-xl"
      />
    </div>
    <div className="col-span-1 row-span-1 relative">
      <KoursairImage
        src={images[1]}
        alt="Collage Image 2"
        fill
        className="object-cover rounded-tr-xl"
      />
    </div>
    <div className="col-span-1 row-span-1 relative">
      <KoursairImage
        src={images[2]}
        alt="Collage Image 3"
        fill
        className="object-cover"
      />
    </div>
    <div className="col-span-1 row-span-1 relative">
      <KoursairImage
        src={images[3]}
        alt="Collage Image 4"
        fill
        className="object-cover rounded-bl-xl"
      />
    </div>
    <div className="col-span-1 row-span-1 relative">
      <KoursairImage
        src={images[4]}
        alt="Collage Image 5"
        fill
        className="object-cover rounded-br-xl"
      />
    </div>
  </div>
);

const DestinationOverview: React.FC<DestinationOverviewProps> = ({
  title,
  overview,
  whygo,
  image,
  collageImages,
}) => {
  return (
    <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-4 md:p-7 rounded-xl shadow-2xl space-y-6">
        <h2 className="text-4xl font-bold text-primary border-b-2 border-primary/50 pb-2">
          About {title.split(",")[0]}
        </h2>

        <div className="prose max-w-none text-base text-gray-600 space-y-4">
          <p className="text-gray-700 leading-relaxed">{overview}</p>

          <h3 className="text-2xl font-semibold text-[var(--color-primary-main)] flex items-center pt-2 border-t border-gray-100">
            <Check className="w-6 h-6" /> Why Go There?
          </h3>
          <p className="text-gray-600 italic">{whygo}</p>
        </div>

        {image && (
          <div className="mt-4 rounded-xl overflow-hidden shadow-lg h-52">
            <KoursairImage
              src={image}
              alt={title}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        )}
      </div>

      <div className="lg:col-span-1 h-[600px] hidden lg:block">
        <DestinationCollage images={collageImages?.slice(0, 5) ?? []} />
      </div>
    </section>
  );
};

export default DestinationOverview;
