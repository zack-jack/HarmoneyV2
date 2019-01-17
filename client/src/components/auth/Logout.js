import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import requireAuth from './requireAuth';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <h2>Successfully logged out.</h2>
        <p>Hope to see ya again soon!</p>
      </div>
    );
  }
}

export default compose(
  connect(
    null,
    actions
  ),
  requireAuth
)(Logout);
