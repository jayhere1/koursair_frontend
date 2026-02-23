"use client";

interface Props {
  filters: string[];
  activeFilter: string;
  onChange: (value: string) => void;
}

const FilterTabs = ({ filters, activeFilter, onChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
            activeFilter === filter
              ? "bg-primary text-white shadow-md"
              : "text-gray-600 bg-white hover:bg-gray-50"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
