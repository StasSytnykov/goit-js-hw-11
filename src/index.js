import './sass/main.scss';
import { ImgApiService } from './js-module/get-data';
import markupTamplate from './hbs-template/render-markup-gallery.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonSearch = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

const imgApiService = new ImgApiService();

const onGetImg = event => {
  event.preventDefault();

  imgApiService.query = event.currentTarget.searchQuery.value;
  imgApiService.resetPage();
  onSearchImg();
};

const onSearchImg = () => {
  loadMoreButton.classList.add('is-hidden');

  imgApiService
    .fetchImage()
    .then(data => {
      if (data.hits.length === 0) {
        Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
      if (data.hits.length !== 0) {
        onRenderMarkupGallery(data.hits);
        console.log(data.hits);
        console.log(data.totalHits);
        loadMoreButton.classList.remove('is-hidden');
      }
    })
    .catch(onShowError);
};

const onRenderMarkupGallery = imgData => {
  galleryContainer.insertAdjacentHTML('beforeend', markupTamplate(imgData));
  onSimpleLightbox();
};

const onClearMarkupContainer = () => {
  galleryContainer.innerHTML = '';
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
  Notify.failure('Error. Please try again.');
};

// const onLoadMore = () => {
//   onSearchImg();

//   if ()
// }

buttonSearch.addEventListener('submit', event => {
  loadMoreButton.classList.remove('is-hidden');
  onClearMarkupContainer();
  onGetImg(event);
});

loadMoreButton.addEventListener('click', onSearchImg);
