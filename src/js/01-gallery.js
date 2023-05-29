import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const galleryItemHTML = galleryItems.map(item => `
  <li class="gallery__item">
    <a class="gallery__link" href="${item.original}">
      <img class="gallery__image" src="${item.preview}" alt="${item.description}" data-source="${item.original}" />
    </a>
  </li>
`);
galleryContainer.innerHTML = galleryItemHTML.join('');

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', event => {
  event.preventDefault();
  const clickedElement = event.target;
  if (clickedElement.tagName !== 'IMG') {
    return;
  }
  const largeImageURL = clickedElement.dataset.source;
  const target = event.target;
  const lightbox = new SimpleLightbox(`
    <img src="${largeImageURL}" alt="${target.alt}" />
  `);
  lightbox.open();

  const closeLightboxOnEscape = event => {
    if (event.key === 'Escape') {
      lightbox.close();
      document.removeEventListener('keydown', closeLightboxOnEscape);
    }
  };
  document.addEventListener('keydown', closeLightboxOnEscape);
});
