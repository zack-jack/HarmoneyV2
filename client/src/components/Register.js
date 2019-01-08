import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../actions/auth';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    errors: []
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name..."
          onChange={this.onChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name..."
          onChange={this.onChange}
        />

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

        <label>Confirm Password</label>
        <input
          type="text"
          name="passwordConfirm"
          placeholder="Confirm Password..."
          onChange={this.onChange}
        />

        <button type="submit">Register</button>
      </form>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
