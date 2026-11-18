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

const renderSearchResults = async (query: string, signal: AbortSignal): Promise<void> => {
  try {
    const countries = await searchCountries(query, signal);
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

const debouncedSearch = debounce(renderSearchResults, 500);

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
