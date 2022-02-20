import './sass/main.scss';
import { fetchImage } from './js-module/get-data';
import markupTamplate from './hbs-template/render-markup-gallery.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonSearch = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');

const onSearchImg = event => {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;

  console.log(searchQuery.value);

  fetchImage(searchQuery.value)
    .then(({ hits }) => {
      console.log(hits);
      if (hits.length === 0) {
        return Promise.reject();
      }
      return onRenderMarkupGallery(hits);
    })
    .catch(onShowError);
};

const onRenderMarkupGallery = imgData => {
  galleryContainer.innerHTML = markupTamplate(imgData);
  onSimpleLightbox();
};

const onSimpleLightbox = () => {
  let gallery = new SimpleLightbox('.gallery a');
  gallery.on('show.simplelightbox', function () {
    // do something…
  });

  gallery.on('error.simplelightbox', function (e) {
    console.log(e); // some usefull information
  });
  gallery.refresh();
};

const onShowError = () => {
  Notify.warning('Sorry, there are no images matching your search query. Please try again.');
};

buttonSearch.addEventListener('submit', onSearchImg);
