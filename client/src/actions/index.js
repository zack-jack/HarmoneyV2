import axios from 'axios';

import { AUTH_USER, AUTH_ERROR } from './types';

export const register = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/user/register', formProps);

    // Dispatch auth token to redux store
    dispatch({ type: AUTH_USER, payload: response.data.token });

    // Save token to localStorage
    localStorage.setItem('token', response.data.token);

    // Call the callback function (ie redirect)
    callback();
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({ type: AUTH_ERROR, payload: errors });
  }
};

export const login = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/user/login', formProps);
    let errors = [];

    // Check errors from API
    if (response.data.message) {
      errors.push(response.data);

      // Dispatch errors to redux store
      dispatch({ type: AUTH_ERROR, payload: errors });
    }

    // Check that no errors exist before login
    if (!errors.length > 0) {
      // Assign token on successful login
      const token = response.data.token;

      // Dispatch auth token to redux store
      dispatch({ type: AUTH_USER, payload: token });

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Call the callback function (ie redirect)
      callback();
    }
  } catch (err) {
    if (err) return err;
  }
};

export const logout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
