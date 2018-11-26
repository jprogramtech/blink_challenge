import axios from 'axios';
import { SET_FAVORITES, SET_LOADING } from './actionTypes';

export const getFavorites = () => dispatch => {
  dispatch({ type: SET_LOADING, payload: true });
  axios.get('/api/favorite').then(res => {
    dispatch({
      type: SET_FAVORITES,
      payload: res['data']['favorites']
    });
  });
};

export const addFavorite = data => dispatch => {
  dispatch({ type: SET_LOADING, payload: true });
  axios
    .post('/api/favorite', data)
    .then(res => {
      dispatch(getFavorites());
    })
    .catch(err => {
      dispatch({ type: SET_LOADING, payload: false });
    });
};

export const clearFavorites = () => dispatch => {
  dispatch({
    type: SET_FAVORITES,
    payload: {}
  });
};
