import { createNewAbortController } from '../core/createNewAbortController';
import { debounce } from '../core/debounce';
import { mapCountryResponse } from '../core/mapCountryResponse';
import { searchCountries } from '../core/searchCountries';
import {
  clearRenderContainer,
  renderCountriesCardsFromData,
  renderLoaderElement,
  renderNotFoundMessage,
  renderErrorMessage,
} from '../ui/renderSearchStates';

const memoizedRenderSearchResults = (): ((query: string, signal: AbortSignal) => Promise<void>) => {
  const responseCache = new Map();

  return async (query: string, signal: AbortSignal): Promise<void> => {
    try {
      let countries;

      if (responseCache.has(query) && responseCache.get(query) !== undefined) {
        countries = responseCache.get(query);
      } else {
        countries = await searchCountries(query, signal);
        responseCache.set(query, countries);
      }

      if (countries.length === 0) {
        renderNotFoundMessage(query);
        return;
      }

      const mappedCountries = mapCountryResponse(countries);
      renderCountriesCardsFromData(mappedCountries);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      if (error instanceof Error) renderErrorMessage(error.name, error.message);
      throw error;
    }
  };
};

const debouncedSearch = debounce(memoizedRenderSearchResults(), 500);

const handleInputSearchEvent = async (event: InputEvent) => {
  const input = event.target as HTMLInputElement;
  const searchQuery = input.value.trim().toLowerCase();
  const abortController = createNewAbortController();

  if (searchQuery) {
    renderLoaderElement();
    debouncedSearch(searchQuery, abortController.signal);
  } else {
    clearRenderContainer();
  }
};

export { handleInputSearchEvent, debouncedSearch };
