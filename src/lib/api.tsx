import { ApiResponse, Filters } from './types';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const fetchCharacters = async (filters: Filters = {}): Promise<ApiResponse> => {
  const params = new URLSearchParams();
  
  if (filters.name) params.append('name', filters.name);
  if (filters.status) params.append('status', filters.status);
  if (filters.species) params.append('species', filters.species);
  if (filters.page) params.append('page', filters.page.toString());
  
  const response = await fetch(`${API_URL}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  
  return response.json();
};