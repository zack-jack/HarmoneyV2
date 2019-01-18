import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

import App from './components/App';
import Welcome from './components/Welcome';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Dashboard from './components/Dashboard';
import NotFound from './components/common/NotFound';

// Setup redux store
// Check localStorage for auth token
const INITIAL_STATE = {
  auth: { authenticated: localStorage.getItem('token') },
  budget: {
    budgets: []
  }
};

// Redux store
const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/user/register" render={() => <Register />} />
          <Route path="/user/login" render={() => <Login />} />
          <Route path="/user/logout" render={() => <Logout />} />
          <Route path="/dashboard" render={() => <Dashboard />} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
