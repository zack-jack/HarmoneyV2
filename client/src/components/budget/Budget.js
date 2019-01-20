import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

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
    this.getSelectedBudgetData();
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
    return (
      <div>
        <p>Budget page</p>
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
