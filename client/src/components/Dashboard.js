import React, { Component } from 'react';

import requireAuth from './auth/requireAuth';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>Dashboard Page</h2>
      </div>
    );
  }
}

export default requireAuth(Dashboard);
