import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';

import { login, resetAuthFormErrors } from '../../actions/auth';

class Login extends Component {
  componentDidMount() {
    // Reset redux form
    this.props.untouch('email', 'password');
    this.props.reset();

    // Reset errors
    this.props.resetAuthFormErrors();
  }

  onSubmit = formProps => {
    this.props.login(formProps, () => {
      this.props.history.push('/dashboard');
    });
  };

  renderErrors = errors => {
    if (this.props.anyTouched && errors) {
      return errors.map((error, i) => {
        return <p key={i}>{error.message}</p>;
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
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

        <div className="login__error">
          {this.renderErrors(this.props.errorMessages)}
        </div>

        <button className="login__button button">Login</button>
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
    { login, resetAuthFormErrors }
  ),
  reduxForm({ form: 'login' }),
  withRouter
)(Login);
