import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getBudgetById } from '../../actions/budget';
import requireAuth from '../auth/requireAuth';

class Budget extends Component {
  state = {
    budget: {
      selected: {}
    }
  };

  componentDidMount() {
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
  }

  render = () => {
    // const { name } = this.props.budget.selected.data.name;

    return (
      <div>
        <p>Budget page</p>
        <p>Viewing name Budget</p>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    budget: {
      selected: state.budget.selected
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
