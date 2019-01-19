import {
  GET_BUDGETS,
  SET_SELECTED_BUDGET,
  GET_BUDGET_BY_ID,
  BUDGET_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  budgets: [],
  selected: {
    _id: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BUDGETS:
      return {
        ...state,
        budgets: action.payload
      };
    case SET_SELECTED_BUDGET:
      return {
        ...state,
        selected: {
          _id: action.payload
        }
      };
    case GET_BUDGET_BY_ID:
      return {
        ...state,
        selected: {
          data: action.payload
        }
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
