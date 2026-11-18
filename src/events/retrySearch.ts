import { createNewAbortController } from '../core/createNewAbortController';
import { renderLoaderElement } from '../ui/renderSearchStates';
import { debouncedSearch } from './searchEvent';

const getCurrentSearchQuery = (): string => {
  const searchInput = document.getElementById('country-search-input') as HTMLInputElement;

  if (searchInput === null) {
    throw new Error('Search input does not exist');
  }

  return searchInput.value;
};

const handleRetryButtonClick = () => {
  const searchQuery = getCurrentSearchQuery();

  const abortController = createNewAbortController();

  if (searchQuery) {
    renderLoaderElement();
    debouncedSearch(searchQuery, abortController.signal);
  }
};

export { handleRetryButtonClick };
