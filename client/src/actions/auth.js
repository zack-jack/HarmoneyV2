import axios from 'axios';

import { GET_ERRORS, SET_USER_AUTH } from './types';

// Register new user
export const registerUser = (formData, history) => dispatch => {
  axios
    .post('/api/user/register', formData)
    .then(res => {
      if (res.status === 200 && res.data) {
        history.push('/user/login');
      } else {
        console.log('Registration error');
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

// Login user
export const loginUser = (formData, history) => dispatch => {
  axios
    .post('/api/user/login', formData)
    .then(res => {
      if (res.status === 200) {
        // Update Redux store with logged in user
        dispatch({
          type: SET_USER_AUTH,
          payload: res.data
        });

        // Redirect to /dashboard
        history.push('/dashboard');
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
      console.log(err);
    });
};
