import dynamic from "next/dynamic";

export const ItineraryMap = dynamic(
  () => import("../../../components/map/interactive_map"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] md:h-[500px] bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
        Loading Map...
      </div>
    ),
  }
);