import './style.css';
import { createModalWindowBaseLayout, createPageLayout, createSearchAppSection } from './ui/staticLayout';

document.body.append(createPageLayout());

const main = document.querySelector('main');

if (main) {
  main.append(createSearchAppSection());
  document.body.append(createModalWindowBaseLayout());
}
