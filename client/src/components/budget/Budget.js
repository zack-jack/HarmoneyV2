import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import BudgetHeader from './BudgetHeader';
import EntryForm from './EntryForm';
import Totals from './Totals';
import { getBudgetById, saveBudget } from '../../actions/budget';
import requireAuth from '../auth/requireAuth';
import IncomeList from './IncomeList';
import ExpensesList from './ExpensesList';

class Budget extends Component {
  state = {
    budget: {
      selected: {
        _id: this.props.budget.selected._id,
        data: {
          _id: '',
          owner: '',
          name: '',
          income: [],
          expenses: []
        }
      }
    }
  };

  componentDidMount() {
    // Fetch the current budget data from DB
    this.getSelectedBudgetData();
  }

  componentDidUpdate(prevProps) {
    const currentData = this.props.budget.selected.data;
    const prevData = prevProps.budget.selected.data;

    // Check if state change
    if (currentData && prevData && prevData !== currentData) {
      // Save new state to db
      this.props.saveBudget(currentData);
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

  render = () => {
    if (this.props.budget.selected.data) {
      return (
        <div>
          <BudgetHeader />
          <Totals />
          <EntryForm />
          <IncomeList />
          <ExpensesList />
        </div>
      );
    } else {
      return null;
    }
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
    { getBudgetById, saveBudget }
  ),
  requireAuth
)(Budget);
