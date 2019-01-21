import {
  GET_BUDGETS,
  ADD_BUDGET,
  SET_SELECTED_BUDGET,
  GET_BUDGET_BY_ID,
  ADD_INCOME,
  ADD_EXPENSE,
  DELETE_INCOME,
  DELETE_EXPENSE,
  SAVE_BUDGET,
  BUDGET_ERROR,
  CLEAR_BUDGETS_DATA,
  DELETE_BUDGET
} from '../actions/types';

const INITIAL_STATE = {
  budgets: [],
  selected: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BUDGETS:
      return {
        ...state,
        budgets: action.payload
      };
    case ADD_BUDGET:
      return {
        ...state,
        budgets: [...state.budgets, action.payload]
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
          _id: action.payload._id,
          data: action.payload
        }
      };
    case ADD_INCOME:
      return {
        ...state,
        selected: {
          data: {
            ...state.selected.data,
            income: [...state.selected.data.income, action.payload]
          }
        }
      };
    case ADD_EXPENSE:
      return {
        ...state,
        selected: {
          data: {
            ...state.selected.data,
            expenses: [...state.selected.data.expenses, action.payload]
          }
        }
      };
    case DELETE_INCOME:
      return {
        ...state,
        selected: {
          data: {
            ...state.selected.data,
            income: action.payload
          }
        }
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        selected: {
          data: {
            ...state.selected.data,
            expenses: action.payload
          }
        }
      };
    case DELETE_BUDGET:
      return {
        ...state
      };
    case SAVE_BUDGET:
      return {
        ...state
      };
    case BUDGET_ERROR:
      return {
        ...state,
        errorMessages: action.payload
      };
    case CLEAR_BUDGETS_DATA:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
