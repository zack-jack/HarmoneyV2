import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getBudgets } from '../actions/budget';
import requireAuth from './auth/requireAuth';

class Dashboard extends Component {
  state = {
    budget: {}
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

  renderBudgets(budget) {
    if (budget.budgets) {
      const budgets = budget.budgets;

      return budgets.map(budget => {
        return <li key={budget._id}>{budget.name}</li>;
      });
    } else {
      return (
        <div>
          <p>No existing budgets found.</p>
          <p>Click "Create New Budget" to start.</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          <button>+ Create New Budget</button>
          <button>Save</button>
          <button>Delete</button>
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
    budget: state.budget
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getBudgets }
  ),
  requireAuth
)(Dashboard);
