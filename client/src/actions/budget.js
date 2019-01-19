import axios from 'axios';

import {
  GET_BUDGETS,
  SET_SELECTED_BUDGET,
  GET_BUDGET_BY_ID,
  ADD_EXPENSE,
  BUDGET_ERROR
} from './types';
import authHeaderConfig from './utils/authHeaderConfig';
import budget from '../reducers/budget';

export const getBudgets = () => async dispatch => {
  try {
    const response = await axios
      .get('/budget/fetch/all', authHeaderConfig)
      .then(res => {
        return res;
      });

    // Dispatch auth token to redux store
    dispatch({ type: GET_BUDGETS, payload: response.data });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const setSelectedBudget = budgetId => async dispatch => {
  try {
    // Dispatch the budgetId to redux store
    dispatch({ type: SET_SELECTED_BUDGET, payload: budgetId });
  } catch (err) {
    const errors = err;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const getBudgetById = budgetId => async dispatch => {
  try {
    const response = await axios
      .get(`/budget/${budgetId}`, authHeaderConfig)
      .then(res => {
        return res;
      });

    // Dispatch auth token to redux store
    dispatch({ type: GET_BUDGET_BY_ID, payload: response.data });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const addExpense = (formProps, callback) => async dispatch => {
  try {
    console.log(formProps);
    // const response = await axios.post('/user/register', formProps);

    // // Dispatch auth token to redux store
    // dispatch({ type: AUTH_USER, payload: response.data.token });

    // // Save token to localStorage
    // localStorage.setItem('token', response.data.token);

    // // Call the callback function (ie redirect)
    // callback();
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};
