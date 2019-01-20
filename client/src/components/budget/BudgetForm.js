import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { addBudget } from '../../actions/budget';
import requireAuth from '../auth/requireAuth';

class BudgetForm extends Component {
  onSubmit = formProps => {
    this.props.addBudget(formProps, budgetId => {
      this.props.history.push(`../budget/${budgetId}`);
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
          <label>Name</label>
          <Field
            name="name"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>

        <div>{this.renderErrors(this.props.errorMessages)}</div>

        <button>Checkmark Icon</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    { addBudget }
  ),
  reduxForm({ form: 'budgetForm' }),
  requireAuth,
  withRouter
)(BudgetForm);
