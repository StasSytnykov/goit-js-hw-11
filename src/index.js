import './sass/main.scss';
import { fetchImage } from './js-module/get-data';

const buttonSearch = document.querySelector('#search-form');

const searchImg = event => {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;

  console.log(searchQuery.value);
};

buttonSearch.addEventListener('submit', searchImg);

fetchImage('nature')
  .then(({ hits }) => {
    console.log(hits);
  })
  .catch(error => console.log(error));
