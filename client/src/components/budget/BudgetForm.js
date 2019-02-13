import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Form, Icon } from 'semantic-ui-react';

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
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="form__field-group">
          <label className="form__field-label">New Budget Name</label>
          <div className="form__field new-budget__field">
            <Field
              name="name"
              type="text"
              component="input"
              autoComplete="none"
            />

            <button className="new-budget__button">
              <Icon
                name="check circle"
                size="big"
                className="new-budget__check"
              />
            </button>
          </div>
        </div>

        <div className="new-budget__error">
          {this.renderErrors(this.props.errorMessages)}
        </div>
      </Form>
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
