import { GET_BUDGETS, BUDGET_ERROR } from '../actions/types';

const INITIAL_STATE = {
  budgets: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BUDGETS:
      return {
        ...state,
        budgets: action.payload
      };
    case BUDGET_ERROR:
      return {
        ...state,
        errorMessages: action.payload
      };
    default:
      return state;
  }
};
