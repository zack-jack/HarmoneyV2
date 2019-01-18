import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import budget from './budget';

export default combineReducers({
  auth,
  budget,
  form: formReducer
});
