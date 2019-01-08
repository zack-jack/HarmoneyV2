import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../actions/auth';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const formData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(formData, this.props.history);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email..."
          onChange={this.onChange}
        />

        <label>Password</label>
        <input
          type="text"
          name="password"
          placeholder="Password..."
          onChange={this.onChange}
        />

        <button type="submit">Login</button>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
