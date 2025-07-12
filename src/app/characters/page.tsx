"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCharactersThunk,
  setFilters,
  resetFilters,
  clearError,
} from "@/store/charactorSlice";
import { SearchBar } from "@/components/SearchBar";
import { CharacterTable } from "@/components/CharactorTable";
import { Pagination } from "@/components/Pagination";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CharactersPage() {
  const dispatch = useAppDispatch();

  // Select state from the Redux store

  const { data, filters, status, error } = useAppSelector(
    (state) => state.character
  );

  // Fetch characters whenever filters change (includes pagination, search, filter)

  useEffect(() => {
    dispatch(fetchCharactersThunk(filters));
  }, [dispatch, filters]);

  // Clear error when filters change (new search initiated)

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, filters.name, filters.status, filters.species]);

  // Handle search input from SearchBar

  const handleSearch = (newFilters: {
    name?: string;
    status?: string;
    species?: string;
  }) => {
    dispatch(setFilters({ ...newFilters, page: 1 }));
  };

  // Handle pagination click

  const handlePageChange = (page: number) => {
    dispatch(setFilters({ page }));
  };

  // Reset all filters

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Rick & Morty Character Table
          </h1>
        </div>

        <SearchBar
          onSearch={handleSearch}
          onReset={handleReset}
          initialFilters={{
            name: filters.name,
            status: filters.status,
            species: filters.species,
          }}
        />
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 relative">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(clearError())}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              aria-label="Close error"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        <CharacterTable />

        {data && data.info.pages > 1 && (
          <Pagination
            currentPage={filters.page || 1}
            totalPages={data.info.pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
