import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { Filters } from "@/lib/types";

interface SearchBarProps {
  onSearch: (filters: Pick<Filters, "name" | "status" | "species">) => void;
  onReset: () => void;
  initialFilters?: Pick<Filters, "name" | "status" | "species">;
}

export const SearchBar = ({
  onSearch,
  onReset,
  initialFilters = {},
}: SearchBarProps) => {
  const [name, setName] = useState(initialFilters.name || "");
  const [status, setStatus] = useState(initialFilters.status || "");
  const [species, setSpecies] = useState(initialFilters.species || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Sync internal state with initialFilters prop changes
  useEffect(() => {
    setName(initialFilters.name || "");
    setStatus(initialFilters.status || "");
    setSpecies(initialFilters.species || "");
  }, [initialFilters]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ name, status, species });
  };

  const handleReset = () => {
    setName("");
    setStatus("");
    setSpecies("");
    onReset();
  };

  const hasFilters = name || status || species;

  return (
    <div className="mb-6">
      {/* Mobile header - always visible on mobile */}
      {isMobile && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg mb-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-4 py-3"
            aria-expanded={isExpanded}
            aria-controls="search-form"
          >
            <div className="flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">Search Characters</span>
            </div>
            {isExpanded ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      )}

      {/* Search form - conditionally displayed on mobile */}
      <form
        id="search-form"
        onSubmit={handleSubmit}
        className={`
          bg-white rounded-lg shadow-lg border border-indigo-100 transition-all duration-300
          ${isMobile && !isExpanded ? "max-h-0 opacity-0 overflow-hidden" : ""}
          ${isMobile && isExpanded ? "max-h-96 opacity-100" : ""}
        `}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4">
          <div className="md:col-span-2">
            <label 
              htmlFor="name-input"
              className="block text-xs font-medium text-indigo-800 uppercase tracking-wider mb-1"
            >
              Character Name
            </label>
            <div className="relative flex items-center">
              <MagnifyingGlassIcon className="absolute left-3 h-4 w-4 text-indigo-400" />
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9 pr-3 py-2 w-full rounded-md border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-800 placeholder-indigo-300"
                placeholder="e.g. Rick Sanchez"
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="status-select"
              className="block text-xs font-medium text-indigo-800 uppercase tracking-wider mb-1"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 w-full rounded-md border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-800"
              >
                <option value="">All Status</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-indigo-400">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label 
              htmlFor="species-input"
              className="block text-xs font-medium text-indigo-800 uppercase tracking-wider mb-1"
            >
              Species
            </label>
            <input
              id="species-input"
              type="text"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="px-3 py-2 w-full rounded-md border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-800 placeholder-indigo-300"
              placeholder="e.g. Human, Alien"
            />
          </div>

          <div className="flex items-end space-x-2">
            <button
              type="submit"
              className="flex-1 inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              {isMobile ? (
                <span>Search</span>
              ) : (
                <>
                  <MagnifyingGlassIcon className="h-4 w-4 mr-1" />
                  <span>Search</span>
                </>
              )}
            </button>

            {hasFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex justify-center items-center p-2 border border-indigo-200 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                title="Reset filters"
                aria-label="Reset filters"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};