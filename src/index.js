import './sass/main.scss';
import { fetchImage } from './js-module/get-data';
import markupTamplate from './hbs-template/render-markup-gallery.hbs';

const buttonSearch = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');

const onSearchImg = event => {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;

  console.log(searchQuery.value);

  // renderMarkup({ hits });

  fetchImage(searchQuery.value)
    .then(({ hits }) => {
      onRenderMarkupGallery(hits);
      console.log(hits);
    })
    .catch(error => console.log(error));

  // fetchImage(searchQuery.value)
  //   .then(renderMarkup({ hits }))
  //   .catch(error => console.log(error));
};

const onRenderMarkupGallery = imgData => {
  galleryContainer.innerHTML = markupTamplate(imgData);
};

buttonSearch.addEventListener('submit', onSearchImg);
