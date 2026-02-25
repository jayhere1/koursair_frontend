import React from "react";
import ItineraryItemWrapper from "./ItineraryItemWrapper";
import DayImageCollage from "./DayImageCollage";

// Type alias helper
type ItineraryDay = {
  day: number;
  title: string;
  images: string[];
  activities: string[];
  coordinates?: { lat: number; lng: number };
  zoom?: number;
};

interface ItinerarySectionProps {
  durationString: string;
  itinerary: ItineraryDay[];
  onDayVisible: (coords: { lat: number; lng: number }, zoom: number) => void;
}

const parseActivity = (activity: string): [string, string[]] | [string] => {
  const listRegex = /(\d+\.\s*.*)/;
  const match = activity.match(listRegex);
  if (match) {
    const mainText = activity.substring(0, match.index!);
    const subPoints = match[1].split(/\s*\d+\.\s*/).filter((p) => p.trim() !== "");
    return [mainText.trim(), subPoints];
  }
  return [activity];
};

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ durationString, itinerary, onDayVisible }) => {
  return (
    <div className="lg:col-span-1 space-y-10">
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">Detailed Itinerary: {durationString.split("•")[1]?.trim() || durationString}</h2>
      <div className="relative border-l-4 border-primary ml-4">
        {itinerary.map((day) => (
          <ItineraryItemWrapper key={day.day} day={day} onVisible={onDayVisible}>
            <div className="mb-12 relative pl-10 group hover:shadow-2xl transition duration-500 rounded-2xl bg-white/50">
              <div className="absolute left-0 top-0 -ml-3 w-6 h-6 rounded-full bg-primary border-4 border-[#F4EFE7] z-10 group-hover:scale-110 transition"></div>
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="relative h-64">
                  <DayImageCollage images={day.images} title={day.title} />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute top-4 left-4 bg-black/40 text-white font-semibold px-3 py-1 rounded-lg text-base sm:text-lg uppercase shadow-md">Day {day.day}</div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{day.title}</h3>
                  <ul className="space-y-3 text-gray-600">
                    {day.activities.map((act: string, idx: number) => {
                      const parsed = parseActivity(act);
                      if (parsed.length === 2) {
                        return (
                          <li key={idx} className="flex items-start gap-3 flex-col">
                            <div className="flex items-start gap-3 w-full">
                              <svg className="w-5 h-5 mt-1 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                              <span className="font-medium">{parsed[0].trim()}</span>
                            </div>
                            <ul className="ml-8 mt-1 space-y-1 list-disc list-inside text-gray-600">
                              {parsed[1].map((sub, subIdx) => <li key={subIdx} className="text-sm">{sub.trim()}</li>)}
                            </ul>
                          </li>
                        );
                      }
                      return (
                        <li key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 mt-1 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          <span className="font-medium">{act}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </ItineraryItemWrapper>
        ))}
      </div>
    </div>
  );
};

export default ItinerarySection;