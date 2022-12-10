import { icons } from './icons';

export function createImage(images) {
    return images.map((image) => `<div class="photo-card">
    <a href="${image.largeImageURL}">
  <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">${image.likes}
      <b>${icons.likes}</b>
    </p>
    <p class="info-item">${image.views}
      <b>${icons.views}</b>
    </p>
    <p class="info-item">${image.comments}
      <b>${icons.comments}</b>
    </p>
    <p class="info-item">${image.downloads}
      <b>${icons.downloads}</b>
    </p>
  </div>
</div>`).join('');
};


