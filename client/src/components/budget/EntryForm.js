import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { Form, Icon } from 'semantic-ui-react';

import { addEntry, saveBudget } from '../../actions/budget';

class EntryForm extends Component {
  onSubmit = formProps => {
    this.props.addEntry(formProps).then(() => {
      // Clear form fields
      this.props.dispatch(reset('expenseForm'));

      this.saveBudgetData(this.props.budget.selected.data);
    });
  };

  saveBudgetData = data => {
    this.props.saveBudget(data);
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
      <Form onSubmit={handleSubmit(this.onSubmit)} className="budget__form">
        <div className="form__field-group">
          <label className="form__field-label">Amount</label>
          <Field
            name="amount"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="$0.00"
            className="form__field"
            style={{ width: '13rem' }}
          />
        </div>

        <div className="form__field-group">
          <label className="form__field-label">Entry Type</label>
          <Field
            name="type"
            component="select"
            className="form__field form__field--select"
          >
            <option value="">-</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Field>
        </div>

        <div className="form__field-group">
          <label className="form__field-label">Description</label>
          <Field
            name="description"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="Add description..."
            className="form__field"
            style={{ width: '25rem' }}
          />
        </div>

        <div className="budget__form-button-group">
          <button disabled={submitting} className="budget__button">
            <Icon name="check circle" size="big" className="budget__check" />
          </button>
          <button
            disabled={pristine || submitting}
            onClick={reset}
            className="budget__button"
          >
            <Icon name="redo" size="big" className="budget__reset" />
          </button>
        </div>

        <div>{this.renderErrors(this.props.errorMessages)}</div>
      </Form>
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
    { addEntry, saveBudget }
  ),
  reduxForm({
    form: 'expenseForm',
    initialValues: {
      type: ''
    }
  })
)(EntryForm);
