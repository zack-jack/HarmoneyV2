import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Register from './auth/Register';

const Welcome = props => {
  return (
    <div>
      <div>
        <h1>Harmoney</h1>
        <p>
          Find perfect harmony with your money with our free personal finance
          app.
        </p>
      </div>

      {props.auth.authenticated ? null : (
        <div>
          <div>
            <h2>Sign up and get started today.</h2>
            <Register />
          </div>

          <div>
            <p>Already have an account with us?</p>
            <Link to="/user/login">Login</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Welcome);
