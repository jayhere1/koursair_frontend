import { ChevronLeft, ChevronRight } from "lucide-react";
import KoursairImage from "@/components/Media/Images/KoursairImage";
import { useEffect, useState } from "react";


export const ImageSlider = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload next image logic
  useEffect(() => {
    if (!images || images.length <= 1) return;

    // Calculate the next index
    const nextIndex = (currentIndex + 1) % images.length;

    // Create a new Image object to force the browser to preload it
    const img = new window.Image();
    img.src = images[nextIndex];
  }, [currentIndex, images]);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0)
    return <div className="bg-gray-200 h-full w-full"></div>;

  return (
    <div className="relative w-full h-full group overflow-hidden bg-gray-900">
      {/* The wrapper div ensures KoursairImage (which is absolute due to 'fill') 
               stays contained correctly.
            */}
      <div className="w-full h-full relative">
        <KoursairImage
          // Key is crucial here! Changing the key forces React to re-mount the
          // component when the index changes, ensuring the shimmer effect
          // plays for every new slide.
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - Slide ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          {...(currentIndex === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>

      {/* Navigation Arrows (Only if > 1 image) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/90 hover:text-primary text-white p-2 cursor-pointer rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/90 hover:text-primary text-white p-2 cursor-pointer rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-4" : "bg-white/50"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}; 