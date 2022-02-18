const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=25768905-c1ae5571e78baab059b11338b';

function fetchImage(imgName) {
  return fetch(
    `${BASE_URL}${API_KEY}&q=${imgName}&image_type=photo&orientation=horizontal&safesearch=true`,
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchImage };
