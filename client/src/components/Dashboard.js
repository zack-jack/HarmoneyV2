import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getBudgets, setSelectedBudget } from '../actions/budget';
import requireAuth from './auth/requireAuth';

class Dashboard extends Component {
  state = {
    budget: {
      budgets: []
    }
  };

  componentDidMount() {
    // Fetch all existing budgets action
    const budgets = this.props.getBudgets();

    // Update component state with budgets from API call
    this.setState({
      budget: {
        budgets
      }
    });
  }

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

  renderBudgets = budget => {
    if (budget.budgets) {
      const budgets = budget.budgets;

      return budgets.map(budget => {
        return (
          <button key={budget._id} onClick={this.setSelectedBudget}>
            <li id={budget._id}>{budget.name}</li>
          </button>
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
          <button>+ Create New</button>
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
    { getBudgets, setSelectedBudget }
  ),
  requireAuth
)(Dashboard);
