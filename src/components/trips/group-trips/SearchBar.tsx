"use client";

interface Props {
  searchTerm: string;
  location: string;
  category: string;
  categories: string[];
  onSearchChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}

const SearchBar = ({
  searchTerm,
  location,
  category,
  categories,
  onSearchChange,
  onLocationChange,
  onCategoryChange,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-10 sm:mb-12 lg:mb-15">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <input
            type="text"
            placeholder="Where"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold bg-primary text-white text-sm sm:text-base">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
