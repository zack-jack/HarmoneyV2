import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { register } from '../../actions/auth';

class Register extends Component {
  onSubmit = formProps => {
    this.props.register(formProps, () => {
      this.props.history.push('/dashboard');
    });
  };

  renderErrors = errors => {
    if (errors) {
      return errors.map((error, i) => {
        return <p key={i}>{error.message}</p>;
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>

        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>

        <fieldset>
          <label>Confirm Password</label>
          <Field
            name="passwordConfirm"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>

        <div>{this.renderErrors(this.props.errorMessages)}</div>

        <button>Register</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessages: state.auth.errorMessages
  };
};

export default compose(
  connect(
    mapStateToProps,
    { register }
  ),
  reduxForm({ form: 'register' }),
  withRouter
)(Register);
