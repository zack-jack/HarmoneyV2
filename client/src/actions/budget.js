import axios from 'axios';

import { GET_BUDGETS, BUDGET_ERROR } from './types';
import authHeaderConfig from './utils/authHeaderConfig';

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
    console.log('error from budget action: ', err);
    const errors = err.response.data.errors;

    dispatch({ type: BUDGET_ERROR, payload: errors });
  }
};
