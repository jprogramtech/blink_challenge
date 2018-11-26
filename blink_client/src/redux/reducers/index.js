import { combineReducers } from 'redux';
import spotifyReducer from './spotifyReducer';
import authReducer from './authReducer';
import favoriteReducer from './favoriteReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  spotify: spotifyReducer,
  auth: authReducer,
  favorites: favoriteReducer,
  error: errorReducer
});
