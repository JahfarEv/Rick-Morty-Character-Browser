'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { CharacterTable } from '@/components/CharactorTable';
import { Pagination } from '@/components/Pagination';
import { useCharacters } from '@/hooks/useCharacters';

const CharactersPage = () => {
  const [initialFilters] = useState({ page: 1 });
  const {
    data,
    loading,
    error,
    filters,
    handleSearch,
    handlePageChange,
  } = useCharacters(initialFilters);

  function handleReset(): void {
    throw new Error('Function not implemented.');
  }

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
            species: filters.species
          }} 
        />
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        <CharacterTable 
          characters={data?.results || []} 
          loading={loading} 
        />

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
};

export default CharactersPage;