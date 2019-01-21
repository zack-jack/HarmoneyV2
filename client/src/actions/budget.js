import axios from 'axios';
import uuid from 'uuid';

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

    // Redirects to newly created budget page
    callback();
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
    const errors = err;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const addEntry = formProps => async dispatch => {
  try {
    if (formProps.type === '') {
      const errors = { message: 'Please provide a valid budget entry type' };

      dispatch({ type: BUDGET_ERROR, payload: errors });
    }

    if (formProps.type === 'income') {
      const id = uuid.v4();

      dispatch({ type: ADD_INCOME, payload: { ...formProps, _id: id } });
    }

    if (formProps.type === 'expense') {
      const id = uuid.v4();

      dispatch({ type: ADD_EXPENSE, payload: { ...formProps, _id: id } });
    }
  } catch (err) {
    const errors = err;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const deleteIncome = updatedList => async dispatch => {
  try {
    dispatch({ type: DELETE_INCOME, payload: updatedList });
  } catch (err) {
    const errors = err;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const deleteExpense = updatedList => async dispatch => {
  try {
    dispatch({ type: DELETE_EXPENSE, payload: updatedList });
  } catch (err) {
    const errors = err;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};

export const saveBudget = data => async dispatch => {
  try {
    const budgetId = data._id;

    const response = await axios
      .put(`/budget/save/${budgetId}`, data, authHeaderConfig)
      .then(res => {
        return res;
      });

    dispatch({ type: SAVE_BUDGET, payload: response.data });
  } catch (err) {
    const errors = err;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};
