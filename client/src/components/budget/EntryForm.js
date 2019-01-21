import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';

import { addEntry } from '../../actions/budget';

class EntryForm extends Component {
  onSubmit = formProps => {
    this.props.addEntry(formProps);

    // Clear form fields
    this.props.dispatch(reset('expenseForm'));
  };

  renderErrors = errors => {
    if (errors) {
      return errors.map((error, i) => {
        return <p key={i}>{error.message}</p>;
      });
    }
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Amount</label>
          <Field
            name="amount"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="$0.00"
          />
        </fieldset>

        <fieldset>
          <label>Entry Type</label>
          <Field name="type" component="select">
            <option value="">-</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
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

        <button disabled={submitting}>Checkmark Icon</button>
        <button disabled={pristine || submitting} onClick={reset}>
          Reset
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    budget: {
      selected: state.budget.selected,
      errorMessages: state.budget.errorMessages
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    { addEntry }
  ),
  reduxForm({
    form: 'expenseForm',
    initialValues: {
      type: ''
    }
  })
)(EntryForm);
