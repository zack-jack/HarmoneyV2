import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessages: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessages: action.payload
      };
    default:
      return state;
  }
};
