import { handleCloseModal } from '../events/modalClose';
import { createSearchField } from './inputs';

const createPageLayout = (): DocumentFragment => {
  const pageLayout = new DocumentFragment();
  const pageElement = document.createElement('div');
  const pageMainElement = document.createElement('main');

  pageElement.classList.add('page');
  pageMainElement.classList.add('page-main');

  pageElement.append(pageMainElement);
  pageLayout.append(pageElement);
  return pageLayout;
};

const createSearchAppSection = (): DocumentFragment => {
  const searchAppSection = new DocumentFragment();

  const appSection = document.createElement('section');
  const searchInput = createSearchField();
  const searchResults = document.createElement('div');

  appSection.classList.add('country-search');
  searchInput.classList.add('country-search__input');
  searchResults.classList.add('country-search__results');

  appSection.append(searchInput, searchResults);
  searchAppSection.append(appSection);

  return searchAppSection;
};

const createModalWindowBaseLayout = (): DocumentFragment => {
  const modalWindowLayout = new DocumentFragment();

  const modalBackdrop = document.createElement('div');
  const modalWrapper = document.createElement('article');

  modalBackdrop.classList.add('modal-window', 'modal-window--hidden');
  modalWrapper.classList.add('modal-window__wrapper');

  modalBackdrop.append(modalWrapper);
  modalWindowLayout.append(modalBackdrop);

  modalBackdrop.addEventListener('mousedown', handleCloseModal);

  return modalWindowLayout;
};

export { createPageLayout, createSearchAppSection, createModalWindowBaseLayout };
