import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getBudgets, setSelectedBudget, deleteBudget } from '../actions/budget';
import requireAuth from './auth/requireAuth';

class Dashboard extends Component {
  state = {
    budget: {
      budgets: []
    },
    selected: {
      _id: ''
    }
  };

  componentDidMount() {
    this.getBudgets();
  }

  getBudgets = () => {
    // Fetch all existing budgets action
    const budgets = this.props.getBudgets();

    // Update component state with budgets from API call
    this.setState({
      budget: {
        budgets
      }
    });
  };

  setSelectedBudget = e => {
    const eventId = e.target.id;
    const selectedBudgetId = this.props.setSelectedBudget(eventId);

    this.setState({
      budget: {
        selected: {
          _id: selectedBudgetId
        }
      }
    });

    this.props.history.push(`../budget/${eventId}`);
  };

  openCreateNew = () => {
    this.props.history.push('../budget/create');
  };

  deleteBudget = e => {
    const budgetId = e.target.parentElement.id;

    // Remove the event budget from the database
    this.props.deleteBudget(budgetId);

    // Update the budgets list
    this.getBudgets();
  };

  renderBudgets = budget => {
    if (budget.budgets) {
      const budgets = budget.budgets;

      return budgets.map(budget => {
        return (
          <div key={budget._id} id={budget._id}>
            <button onClick={this.setSelectedBudget}>
              <li id={budget._id}>{budget.name}</li>
            </button>

            <button onClick={this.deleteBudget}>Delete</button>
          </div>
        );
      });
    } else {
      return (
        <div>
          <p>No existing budgets found.</p>
          <p>Click "Create New" to start.</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div>
          <button onClick={this.openCreateNew}>+ Create New</button>
        </div>

        <div>
          <ul>{this.renderBudgets(this.props.budget)}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    budget: {
      budgets: state.budget.budgets,
      selected: {
        _id: state.budget.selected
      }
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getBudgets, setSelectedBudget, deleteBudget }
  ),
  requireAuth
)(Dashboard);
