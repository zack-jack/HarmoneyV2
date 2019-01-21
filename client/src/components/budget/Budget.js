import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import BudgetHeader from './BudgetHeader';
import EntryForm from './EntryForm';
import Totals from './Totals';
import { getBudgetById } from '../../actions/budget';
import requireAuth from '../auth/requireAuth';

class Budget extends Component {
  state = {
    budget: {
      selected: {
        _id: this.props.budget.selected._id,
        data: {}
      }
    }
  };

  componentDidMount() {
    // Fetch the current budget data from DB
    this.getSelectedBudgetData();
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.budget.selected.data;
    const next = nextProps.budget.selected.data;
    const budgetId = this.props.budget.selected.data._id;

    // If change in redux store, call to save to DB
    if (current !== next) {
      this.saveBudget(budgetId);
    }
  }

  getSelectedBudgetData = () => {
    const budgetId = this.props.budget.selected._id;

    // Fetch selected budget data with API call
    const selectedBudgetData = this.props.getBudgetById(budgetId);

    // Update component state with the selected budget's data from API call
    this.setState({
      budget: {
        selected: {
          data: selectedBudgetData
        }
      }
    });
  };

  saveBudget = budgetId => {
    console.log(budgetId);
  };

  render = () => {
    return (
      <div>
        <BudgetHeader />
        <Totals />
        <EntryForm />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    budget: {
      selected: {
        _id: state.budget.selected._id,
        data: state.budget.selected.data
      }
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getBudgetById }
  ),
  requireAuth
)(Budget);
