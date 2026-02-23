import React from "react";
import { DollarSign, CloudSun, Globe, MapPin } from "lucide-react";
import { DestinationData } from "@/types/destination";

interface DestinationKeyFactsProps {
  keyFacts: DestinationData["keyFacts"];
}

const FactCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="bg-white p-3 md:p-6 rounded-xl shadow-lg border border-primary flex items-center space-x-2 md:space-x-4">
    <div className="text-primary flex-shrink-0">{icon}</div>
    <div>
      <p className="text-xs md:text-sm font-normal md:font-medium text-gray-500">
        {label}
      </p>
      <p className="text-base md:text-lg font-medium md:font-semibold text-primary">
        {value}
      </p>
    </div>
  </div>
);

const DestinationKeyFacts: React.FC<DestinationKeyFactsProps> = ({
  keyFacts,
}) => {
  const factIcons: { [key: string]: React.ReactNode } = {
    currency: <DollarSign className="w-6 h-6" />,
    avgTemp: <CloudSun className="w-6 h-6" />,
    timezone: <Globe className="w-6 h-6" />,
    language: <MapPin className="w-6 h-6" />,
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 p-2">
      {Object.entries(keyFacts).map(([key, fact]) => (
        <FactCard
          key={key}
          icon={factIcons[key]}
          label={
            key.charAt(0).toUpperCase() +
            key.slice(1).replace(/([A-Z])/g, " $1")
          }
          value={fact.value}
        />
      ))}
    </div>
  );
};

export default DestinationKeyFacts;
