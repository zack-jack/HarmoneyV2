import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './styles/styles.scss';

import App from './components/App';
import Welcome from './components/Welcome';
import RegistrationPage from './components/auth/RegistrationPage';
import LoginPage from './components/auth/LoginPage';
import Logout from './components/auth/Logout';
import Dashboard from './components/Dashboard';
import NewBudget from './components/budget/NewBudget';
import Budget from './components/budget/Budget';
import NotFound from './components/common/NotFound';

import { store, persistor } from './store/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/user/register" render={() => <RegistrationPage />} />
            <Route path="/user/login" render={() => <LoginPage />} />
            <Route path="/user/logout" render={() => <Logout />} />
            <Route path="/dashboard" render={() => <Dashboard />} />
            <Route path="/budget/create" render={() => <NewBudget />} />
            <Route path="/budget/:id" render={() => <Budget />} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
