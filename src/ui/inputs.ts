import { handleRetryButtonClick } from '../events/retrySearch';
import { handleInputSearchEvent } from '../events/searchEvent';

const createSearchField = (): HTMLInputElement => {
  const searchField = document.createElement('input');

  searchField.setAttribute('type', 'text');
  searchField.setAttribute('placeholder', 'Search a country...');
  searchField.id = 'country-search-input';

  searchField.addEventListener('input', handleInputSearchEvent);

  return searchField;
};

const createRetryButton = (): HTMLButtonElement => {
  const retryButton = document.createElement('button');
  retryButton.addEventListener('click', handleRetryButtonClick);

  return retryButton;
};

export { createSearchField, createRetryButton };
