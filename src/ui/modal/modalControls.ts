const getElementByQuerySelector = (selector: string, element?: Element) => {
  const foundedElement = element ? element.querySelector(selector) : document.querySelector(selector);
  if (foundedElement === null) {
    throw new Error();
  }

  return foundedElement;
};

const openModalWithLayout = (modalLayout: DocumentFragment): void => {
  const modalWindow = getElementByQuerySelector('.modal-window');
  const modalRenderElement = getElementByQuerySelector('.modal-window__wrapper', modalWindow);

  modalWindow.classList.remove('modal-window--hidden');
  modalWindow.classList.add('modal-window--visible');
  modalRenderElement.append(modalLayout);
};

const closeModal = (): void => {
  const modalWindow = getElementByQuerySelector('.modal-window');
  const modalRenderElement = getElementByQuerySelector('.modal-window__wrapper', modalWindow);

  modalWindow.classList.remove('modal-window--visible');
  modalWindow.classList.add('modal-window--hidden');
  modalRenderElement.replaceChildren();
};

export { openModalWithLayout, closeModal };
