import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user/register" component={Register} />
          <Route path="/user/register" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
