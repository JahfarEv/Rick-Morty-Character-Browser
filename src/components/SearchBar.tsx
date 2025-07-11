import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Filters } from '@/lib/types';

interface SearchBarProps {
  onSearch: (filters: Pick<Filters, 'name' | 'status' | 'species'>) => void;
  onReset: () => void;
  initialFilters?: Pick<Filters, 'name' | 'status' | 'species'>;
}

export const SearchBar = ({ onSearch, onReset, initialFilters = {} }: SearchBarProps) => {
  const [name, setName] = useState(initialFilters.name || '');
  const [status, setStatus] = useState(initialFilters.status || '');
  const [species, setSpecies] = useState(initialFilters.species || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ name, status, species });
  };

  const handleReset = () => {
    setName('');
    setStatus('');
    setSpecies('');
    onReset();
  };

  const hasFilters = name || status || species;


  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white rounded-lg shadow-lg border border-indigo-100">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-indigo-800 uppercase tracking-wider mb-1">
            Character Name
          </label>
          <div className="relative flex items-center">
            <MagnifyingGlassIcon className="absolute left-3 h-4 w-4 text-indigo-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-9 pr-3 py-2 w-full rounded-md border border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm text-gray-800 placeholder-indigo-300"
              placeholder="e.g. Rick Sanchez"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-indigo-800 uppercase tracking-wider mb-1">
            Status
          </label>
          <div className="relative">
            <select
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
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-indigo-800 uppercase tracking-wider mb-1">
            Species
          </label>
          <input
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
            <MagnifyingGlassIcon className="h-4 w-4 mr-1" />
            Search
          </button>
          
         {hasFilters && (
    <button
      type="button"
      onClick={handleReset}
      className="inline-flex justify-center items-center p-2 border border-indigo-200 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      title="Reset filters"
    >
      <XMarkIcon className="h-4 w-4" />
    </button>
          )}
        </div>
      </div>
    </form>
  );
};