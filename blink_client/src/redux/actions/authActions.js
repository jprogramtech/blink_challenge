import axios from 'axios';
import { SET_ERRORS, SET_CURRENT_USER } from './actionTypes';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login - Get user token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;

      // Set token to ls
      localStorage.setItem('jwtToken', token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Log user out
export const logoutUser = () => dispatch => {
  //Remove token from localstorge
  localStorage.removeItem('jwtToken');

  // Remove auth header for future request
  setAuthToken(false);

  // Set current user to {} and set authenticated to false
  dispatch(setCurrentUser({}));
};

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
