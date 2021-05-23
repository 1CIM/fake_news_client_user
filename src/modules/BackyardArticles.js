import axios from 'axios';
import store from '../state/store/configureStore';
import errorHandler from './ErrorHandler';

const BackyardArticles = {
  async index(coords) {
    if (coords) {
      try {
        let { latitude, longitude } = coords;
        let response = await axios.get(
          `/backyards/?lat=${latitude}&lon=${longitude}`
        );
        store.dispatch({
          type: 'SET_BACKYARD_ARTICLES',
          payload: response.data.backyard_articles,
        });
      } catch (error) {
        errorHandler(error);
      }
    } else {
      store.dispatch({
        type: 'ERROR_MESSAGE',
        payload: 'Please allow your location to see the backyard articles.',
      });
    }
  },
  async show(id) {
    try {
      const response = await axios.get(`/backyards/${id}`);
      store.dispatch({
        type: 'SHOW_BACKYARD_ARTICLE',
        payload: response.data.backyard_article,
      });
    } catch (error) {
      errorHandler(error);
    }
  },
  async create(backyardArticle) {
    try {
      const params = { backyardArticle: backyardArticle };
      await axios.post('/backyards', params, {
        headers: getUserAuthToken(),
      });
      store.dispatch({
        type: 'SUCCESS_MESSAGE',
        payload: 'Your backyard article was published!',
      });
    } catch (error) {
      errorHandler(error);
    }
  },
};

export default BackyardArticles;

const getUserAuthToken = () => {
  return JSON.parse(localStorage.getItem('user_headers'));
};
