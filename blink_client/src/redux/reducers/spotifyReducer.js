import { SET_SEARCH_RESULT, SET_SPOTIFY_LOADING } from '../actions/actionTypes';

const initialState = {
  search: null,
  loading: false,
  searchResults: {},
  currentPage: 0,
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return {
        ...state,
        searchResults: action.payload.data,
        search: action.payload.search,
        currentPage: action.payload.pageOffset,
        loading: false,
        error: action.payload.error
      };

    case SET_SPOTIFY_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
