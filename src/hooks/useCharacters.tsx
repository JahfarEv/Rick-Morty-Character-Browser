import { useState, useEffect } from 'react';
import { fetchCharacters } from '@/lib/api';
import type { ApiResponse, Filters } from '@/lib/types'; 

export const useCharacters = (initialFilters: Filters = {}) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await fetchCharacters(filters);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [filters]);

  const handleSearch = (newFilters: Filters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return {
    data,
    loading,
    error,
    filters,
    handleSearch,
    handlePageChange,
  };
};