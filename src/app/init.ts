import { createModalWindowBaseLayout, createPageLayout, createSearchAppSection } from '../ui/staticLayout';

const initApp = (): void => {
  document.body.append(createPageLayout());
  const main = document.querySelector('main');

  if (main) {
    main.append(createSearchAppSection());
    document.body.append(createModalWindowBaseLayout());
  }
};

export { initApp };
