import type { Country } from '../types/apiResponse';
import { HttpError } from './HttpError';

const searchCountries = async (query: string, signal: AbortSignal): Promise<Country[]> => {
  const fetchUrl = `https://countries.dev/name/${encodeURIComponent(query)}`;
  const timeoutSignal = AbortSignal.timeout(3000);
  const combinedSignal = AbortSignal.any([signal, timeoutSignal]);

  const response = await fetch(fetchUrl, {
    signal: combinedSignal,
    method: 'GET',
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response.json();
};

export { searchCountries };
