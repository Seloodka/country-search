import type { mappedResponse } from '../../core/mapCountryResponse';

type formattedDetails = {
  area: string;
  currencies: string;
  borders: string;
};

const formatData = (cardDetails: mappedResponse['details']): formattedDetails => {
  const area = cardDetails.area + ' km²' || 'no information';
  const currencies = cardDetails.currencies === null ? 'no information' : cardDetails.currencies.join(', ');
  const borders = cardDetails.borders === null ? 'no borders' : cardDetails.borders.join(', ');

  return {
    area,
    currencies,
    borders,
  };
};

const createModalDetailsLayout = (cardDetails: mappedResponse['details']): DocumentFragment => {
  const modalDetailsLayout = new DocumentFragment();
  const formattedCardDetails = formatData(cardDetails);
  const areaElement = document.createElement('span');
  const currenciesElement = document.createElement('span');
  const bordersElement = document.createElement('span');

  areaElement.textContent = `Area: ${formattedCardDetails.area}`;
  currenciesElement.textContent = `Currencies: ${formattedCardDetails.currencies}`;
  bordersElement.textContent = `Borders: ${formattedCardDetails.borders}`;

  modalDetailsLayout.append(areaElement, currenciesElement, bordersElement);

  return modalDetailsLayout;
};

const createCardModalWithDetails = (
  cardDetails: mappedResponse['details'],
  targetCard: HTMLElement,
): DocumentFragment => {
  const modalWindowData = new DocumentFragment();
  const cardDataElement = Array.from(targetCard.children).map((element) => element.cloneNode(true));
  const cardDetailsLayout = createModalDetailsLayout(cardDetails);

  modalWindowData.append(...cardDataElement, cardDetailsLayout);

  return modalWindowData;
};

export { createCardModalWithDetails };
