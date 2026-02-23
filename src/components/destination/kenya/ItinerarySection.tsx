import { ItineraryDay } from "@/types/kenyaTraveller";
import { ItineraryItem } from "./ItineraryItem";

interface Props {
  itinerary: ItineraryDay[];
  onDayVisible: (
    coords: { lat: number; lng: number },
    zoom: number
  ) => void;
}

export default function KenyaItinerarySection({
  itinerary,
  onDayVisible,
}: Props) {
  return (
    <div className="space-y-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
        Detailed Itinerary
      </h2>

      <div className="relative border-l-4 border-primary ml-2">
        {itinerary.map((day) => (
          <ItineraryItem
            key={day.day}
            day={day}
            onVisible={onDayVisible}
          />
        ))}
      </div>
    </div>
  );
}
