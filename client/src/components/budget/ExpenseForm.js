import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { addExpense } from '../../actions/budget';

class ExpenseForm extends Component {
  onSubmit = formProps => {
    this.props.addExpense(formProps, () => {});
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
          <label>Amount</label>
          <Field
            name="amount"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>

        <fieldset>
          <label>Expense Type</label>
          <Field name="type" component="select">
            <select>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </Field>
        </fieldset>

        <fieldset>
          <label>Description</label>
          <Field
            name="description"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="Add description..."
          />
        </fieldset>

        <div>{this.renderErrors(this.props.errorMessages)}</div>

        <button>Checkmark Icon</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    budget: {
      selected: this.state.budget.selected,
      errorMessages: this.state.budget.errorMessages
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    { addExpense }
  ),
  reduxForm({ form: 'expenseForm' })
)(ExpenseForm);
