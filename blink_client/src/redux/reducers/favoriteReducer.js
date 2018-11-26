import { SET_FAVORITES, SET_LOADING } from '../actions/actionTypes';

const initialState = {
  favorites: {},
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
