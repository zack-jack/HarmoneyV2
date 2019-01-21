import axios from 'axios';

import {
  GET_BUDGETS,
  ADD_BUDGET,
  SET_SELECTED_BUDGET,
  GET_BUDGET_BY_ID,
  ADD_INCOME,
  ADD_EXPENSE,
  BUDGET_ERROR
} from './types';
import authHeaderConfig from './utils/authHeaderConfig';

export const getBudgets = () => async dispatch => {
  try {
    const response = await axios
      .get('/budget/fetch/all', authHeaderConfig)
      .then(res => {
        return res;
      });

    // Dispatch budgets array to redux store
    dispatch({ type: GET_BUDGETS, payload: response.data });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const addBudget = (formProps, callback) => async dispatch => {
  try {
    const payload = { ...formProps, income: [], expenses: [] };
    const response = await axios
      .post('/budget/create', payload, authHeaderConfig)
      .then(res => {
        return res;
      });

    const budgetData = response.data.budget;
    const budgetId = budgetData._id;

    // Dispatch new budget data to redux store
    dispatch({ type: ADD_BUDGET, payload: budgetData });

    // Set selected to the new budget
    dispatch({ type: SET_SELECTED_BUDGET, payload: budgetId });

    // Set selected budget data for the new budget
    dispatch({ type: GET_BUDGET_BY_ID, payload: budgetData });

    callback(budgetId);
  } catch (err) {
    const errors = err;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const setSelectedBudget = budgetId => async dispatch => {
  try {
    // Dispatch the budgetId to redux store
    dispatch({ type: SET_SELECTED_BUDGET, payload: budgetId });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const getBudgetById = budgetId => async dispatch => {
  try {
    const response = await axios
      .get(`/budget/fetch/${budgetId}`, authHeaderConfig)
      .then(res => {
        return res;
      });

    // Dispatch budget data to redux store
    dispatch({ type: GET_BUDGET_BY_ID, payload: response.data });
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const addEntry = (formProps, callback) => async dispatch => {
  try {
    if (formProps.type === '') {
      const errors = { message: 'Please provide a valid budget entry type' };

      dispatch({ type: BUDGET_ERROR, payload: errors });
    }

    if (formProps.type === 'income') {
      dispatch({ type: ADD_INCOME, payload: formProps });
    }

    if (formProps.type === 'expense') {
      dispatch({ type: ADD_EXPENSE, payload: formProps });
    }

    callback();
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};
