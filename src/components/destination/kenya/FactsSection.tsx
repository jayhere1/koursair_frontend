import { DollarSign, CloudSun, Globe, MapPin } from "lucide-react";
import { FactCard } from "./FactCard";

interface Props {
  facts: {
    currency: { value: string };
    avgTemp: { value: string };
    language: { value: string };
  };
}

export default function KenyaFacts({ facts }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      <FactCard
        icon={<DollarSign className="w-6 h-6" />}
        label="Currency"
        value={facts.currency.value}
      />
      <FactCard
        icon={<CloudSun className="w-6 h-6" />}
        label="Avg Temp"
        value={facts.avgTemp.value}
      />
      <FactCard
        icon={<Globe className="w-6 h-6" />}
        label="Focus"
        value="Luxury & Business"
      />
      <FactCard
        icon={<MapPin className="w-6 h-6" />}
        label="Language"
        value={facts.language.value}
      />
    </div>
  );
}
