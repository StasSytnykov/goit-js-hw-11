const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '?key=25768905-c1ae5571e78baab059b11338b';

class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImage() {
    const url = `${BASE_URL}${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    const response = await axios.get(url);
    const image = response.data;
    this.incrementPage();
    return image;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { ImgApiService };
