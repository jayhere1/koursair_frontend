import KoursairImage from "@/components/Media/Images/KoursairImage";
import { CalendarClock } from "lucide-react";

interface Props {
  heroImage: string;
  title: string;
  destination: string;
  departureLabel?: string;
}

export default function KenyaHero({
  heroImage,
  title,
  destination,
  departureLabel,
}: Props) {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <KoursairImage
        src={heroImage}
        alt={title}
        fill
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div className="text-center text-white max-w-5xl px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2">
            {title}
          </h1>

          <p className="text-lg md:text-xl lg:text-3xl font-light">
            {destination}
          </p>

          {departureLabel && (
            <p className="mt-2 flex justify-center items-center gap-2 text-sm md:text-lg font-medium text-white/90">
              <CalendarClock className="w-4 h-4" />
              {departureLabel}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
