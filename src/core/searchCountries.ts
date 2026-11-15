import type { Country } from '../types/apiResponse';

const searchCountries = async (query: string, signal: AbortSignal): Promise<Country[]> => {
  const response = await fetch(`https://countries.dev/name/${encodeURIComponent(query)}`, { signal, method: 'GET' });

  return response.json();
};

export { searchCountries };
