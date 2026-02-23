import React, { useState, useRef, useEffect,useMemo } from "react";
import { ChevronDown } from "lucide-react";

// --- CUSTOM SELECT / COMBOBOX COMPONENT ---
interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select...", 
  className = "",
  disabled = false,
  searchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Sync internal text (query) with external value selection
  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    if (selectedOption) {
      setQuery(selectedOption.label);
    } else if (!value) {
      setQuery("");
    }
  }, [value, options]);

  // 2. Handle Outside Click (Close & Reset invalid text)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // If user typed something but didn't select, revert to valid value
        const isValid = options.some(opt => opt.label.toLowerCase() === query.toLowerCase());
        if (!isValid) {
            const selected = options.find(opt => opt.value === value);
            setQuery(selected ? selected.label : "");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query, options, value]);

  // 3. Filter Options
  const filteredOptions = useMemo(() => {
    if (!searchable || query === "") return options;
    return options.filter((opt) => 
      opt.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query, searchable]);

  // 4. Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    // Optional: Clear parent value while typing new one
    if (value) onChange(""); 
  };

  const handleSelect = (optionValue: string, optionLabel: string) => {
    onChange(optionValue);
    setQuery(optionLabel);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* TRIGGER AREA */}
        <div
          // If not searchable, clicking anywhere toggles. If searchable, input focus handles it.
          onClick={() => !searchable && !disabled && setIsOpen(!isOpen)}
          className={`${className} flex items-center justify-between cursor-pointer ${disabled ? 'pointer-events-none opacity-60' : ''} ${isOpen ? 'ring-1 ring-primary' : ''} bg-white transition-all`}
        >
        {searchable ? (
            // TYPE-TO-SEARCH INPUT
            <input 
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full h-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
        ) : (
            // STANDARD DROPDOWN TEXT
            <span className={`block truncate ${!value ? "text-gray-500" : "text-gray-900"}`}>
               {options.find(o => o.value === value)?.label || placeholder}
            </span>
        )}
        
        <ChevronDown 
            onClick={(e) => {
                // Allow clicking the arrow specifically to toggle input mode too
                if (searchable) {
                    e.stopPropagation(); 
                    setIsOpen(!isOpen);
                }
            }}
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`} 
        />
      </div>

      {/* DROPDOWN OPTIONS */}
      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 w-full max-h-60 overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg border-1 border-gray-400 focus:outline-none sm:text-sm">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100 ${
                  value === option.value ? "bg-primary text-white" : "text-gray-900"
                }`}
                onClick={() => handleSelect(option.value, option.label)}
              >
                <span className={`block truncate font-normal`}>
                  {option.label}
                </span>
              </div>
            ))
          ) : (
            <div className="py-2 pl-3 pr-9 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};