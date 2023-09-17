import SimpleLightbox from 'simplelightbox';
// Dodatkowy import stylów
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items.js';
// Change code below this line
export function generateGallery() {
  const galleryContainer = document.querySelector('.gallery');
  const galleryMarkup = createGallery(galleryItems);
  galleryContainer.insertAdjacentHTML('afterbegin', galleryMarkup);

  function createGallery(items) {
    return items
      .map(({ preview, original, description }) => {
        return `<li>
    <a class="gallery__item" href="${original}" >
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
</li>`;
      })
      .join('');
  }

  const lightbox = new SimpleLightbox(`.gallery a`, {
    captionsData: `alt`,
    captionPosition: `bottom`,
    captionDelay: 250,
  });

  console.log(galleryItems);
}
