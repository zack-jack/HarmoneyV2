import { SET_USER_AUTH } from '../actions/types';

const initialState = {
  isAuth: false,
  user: {}
};

export default function(state = initialState, action) {
  console.log('authReducer action: ', action);
  switch (action.type) {
    case SET_USER_AUTH:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        user: action.payload.user
      };
    default:
      return state;
  }
}
