import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';

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
      <Form onSubmit={handleSubmit(this.onSubmit)} className="register__form">
        <div className="form__field-group">
          <label className="form__field-label">Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
            className="form__field"
          />
        </div>

        <div className="form__field-group">
          <label className="form__field-label">Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
            className="form__field"
          />
        </div>

        <div className="form__field-group">
          <label className="form__field-label">Confirm Password</label>
          <Field
            name="passwordConfirm"
            type="password"
            component="input"
            autoComplete="none"
            className="form__field"
          />
        </div>

        <div className="register__error">
          {this.renderErrors(this.props.errorMessages)}
        </div>

        <button className="register__button button">Register</button>
      </Form>
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
