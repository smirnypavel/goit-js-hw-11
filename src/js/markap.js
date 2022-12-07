export function createMarkup (arr){
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
    <div class="photo-card gallery__image"> 
    <a class="gallery__item" href="${largeImageURL}">
    <img class="gallery__image gallery__link"
         src="${webformatURL}"
        data-source="${largeImageURL}"
        alt="${tags}" loading="lazy"/>
        </a>

    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
    </div> `).join('')
}
// {/* <li class="gallery__link">
// <a class="gallery__item" href="${original}">
// <img
//     class="gallery__image"
//     src="${preview}"
//     data-source="${original}"
//     alt="${description}"
//     />
// </a>
// </li> */}