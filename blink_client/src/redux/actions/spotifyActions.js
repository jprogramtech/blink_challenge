import axios from 'axios';
import { SET_SEARCH_RESULT, SET_SPOTIFY_LOADING } from './actionTypes';

export const getLoinToken = () => {};

export const searchArtist = (search, offset, currentPage) => dispatch => {
  axios
    .get(`api/spotify/artist/${search}?offset=${offset}`)
    .then(res => {
      let data = res.data;
      if (typeof res.data === 'string') {
        data = {};
      }

      let payload = {
        data: data,
        search: search,
        pageOffset: currentPage,
        error: {}
      };

      dispatch({
        type: SET_SEARCH_RESULT,
        payload: payload
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SEARCH_RESULT,
        payload: {
          data: {},
          search: null,
          pageOffset: currentPage,
          error: { error: err.message }
        }
      });
    });
};

export const setSpotifySearchLoading = () => dispatch => {
  dispatch({
    type: SET_SPOTIFY_LOADING,
    payload: true
  });
};

export const clearSearchResults = () => dispatch => {
  dispatch({
    type: SET_SEARCH_RESULT,
    payload: { data: {}, search: null, pageOffset: 0, error: {} }
  });
};
