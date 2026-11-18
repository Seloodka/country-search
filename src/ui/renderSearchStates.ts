import type { mappedResponse } from '../core/mapCountryResponse';
import { createRetryButton } from './inputs';
import { createCardModalWithDetails } from './modal/createModalFromData';
import { openModalWithLayout } from './modal/modalControls';
import flagPlaceholder from '../assets/flagPlaceholder.png';

const getRenderContainer = (): HTMLDivElement => {
  const renderContainer = document.querySelector<HTMLDivElement>('.country-search__results');
  if (renderContainer === null) {
    throw new Error('Render element does not exist');
  }

  return renderContainer;
};

const createCountryCardsFromData = (mappedCountriesData: mappedResponse[]): DocumentFragment => {
  const countryCards = new DocumentFragment();

  mappedCountriesData.forEach((country) => {
    const cardWrapper = document.createElement('article');
    const cardFlag = new Image();
    const cardHeader = document.createElement('header');
    const cardName = document.createElement('h2');
    const cardCapital = document.createElement('span');
    const cardPopulation = document.createElement('span');
    const cardLanguages = document.createElement('span');

    cardWrapper.classList.add('country-search__result');
    cardHeader.classList.add('country-search__result-header');

    cardFlag.setAttribute('src', `${country.flagImagePath || flagPlaceholder}`);
    cardFlag.setAttribute('alt', `${country.name} Flag`);

    cardName.innerText = country.name;
    cardCapital.innerText = 'Capital: ' + (country.capital || 'no information');
    cardPopulation.innerText = 'Population: ' + country.population;

    const languages = country.languages !== null ? country.languages.join(', ') : 'no information';
    cardLanguages.innerText = 'Languages: ' + languages;

    cardHeader.append(cardFlag, cardName);
    cardWrapper.append(cardHeader, cardCapital, cardPopulation, cardLanguages);
    countryCards.append(cardWrapper);

    cardWrapper.addEventListener('click', () => {
      openModalWithLayout(createCardModalWithDetails(country.details, cardWrapper));
    });
  });

  return countryCards;
};

const renderCountriesCardsFromData = (mappedCountriesData: mappedResponse[]): void => {
  const renderContainer = getRenderContainer();
  const countryCards = createCountryCardsFromData(mappedCountriesData);

  renderContainer.replaceChildren();
  renderContainer.append(countryCards);
};

const renderNotFoundMessage = (query: string): void => {
  const renderContainer = getRenderContainer();

  const notFoundMessageElement = document.createElement('span');
  notFoundMessageElement.innerText = `For query ${query} nothing founded`;

  renderContainer.replaceChildren();
  renderContainer.append(notFoundMessageElement);
};

const renderLoaderElement = (): void => {
  const renderContainer = getRenderContainer();

  if (renderContainer.querySelector('.loader') !== null) {
    return;
  }

  const loaderElement = document.createElement('div');
  loaderElement.classList.add('loader');

  renderContainer.replaceChildren();
  renderContainer.append(loaderElement);
};

const renderErrorMessage = (errorName: string, errorMessage: string): void => {
  const renderContainer = getRenderContainer();
  const errorMessageWrapper = document.createElement('div');
  const retryButton = createRetryButton();
  const messageElement = document.createElement('span');

  errorMessageWrapper.classList.add('error-wrapper');
  messageElement.textContent = `${errorName} ${errorMessage}`;

  retryButton.classList.add('retry-button');
  retryButton.innerText = 'Retry';

  renderContainer.replaceChildren();
  errorMessageWrapper.append(messageElement, retryButton);
  renderContainer.append(errorMessageWrapper);
};

const clearRenderContainer = (): void => {
  const renderContainer = getRenderContainer();
  renderContainer.replaceChildren();
};

export {
  renderCountriesCardsFromData,
  renderNotFoundMessage,
  renderLoaderElement,
  clearRenderContainer,
  renderErrorMessage,
};
