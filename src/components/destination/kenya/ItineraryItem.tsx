import { ItineraryDay } from "@/types/kenyaTraveller";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer"; 
import { ImageSlider } from "./ImageSlider";
import { CheckCircle, MapPin } from "lucide-react";

export const ItineraryItem = ({
  day,
  onVisible,
}: {
  day: ItineraryDay;
  onVisible: (coords: { lat: number; lng: number }, zoom: number) => void;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && day.coordinates) {
      onVisible(day.coordinates, day.zoom || 11);
    }
  }, [inView, day, onVisible]);

  return (
    <div ref={ref} className="mb-12 relative pl-6 md:pl-10 group">
      <div className="absolute left-0 top-6 -ml-2 md:-ml-3 w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary border-4 border-[#F4EFE7] z-10 group-hover:scale-125 transition"></div>
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition duration-500">
        {/* IMAGE SLIDER */}
        <div className="relative h-48 md:h-64">
          <ImageSlider images={day.images || []} title={day.title} />
          <div className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-md text-xs md:text-sm font-bold shadow-lg backdrop-blur-sm z-10">
            {day.subtitle}
          </div>
        </div>

        <div className="p-4 md:p-6 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              {day.title}
            </h3>
          </div>

          <ul className="space-y-3 text-gray-600 mb-6">
            {day.activities.map((act: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-sm sm:text-base">{act}</span>
              </li>
            ))}
          </ul>

          {/* ACCOMMODATION SPOTLIGHT */}
          {day.accommodation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wide">
                  Accommodation
                </p>
                <p className="font-bold text-gray-800 text-sm md:text-base">
                  {day.accommodation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
