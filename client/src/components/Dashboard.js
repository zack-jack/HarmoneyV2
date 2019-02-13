import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';

import { getBudgets, setSelectedBudget, deleteBudget } from '../actions/budget';
import requireAuth from './auth/requireAuth';

class Dashboard extends Component {
  state = {
    budget: {
      budgets: this.props.budget.budgets
    },
    selected: {
      _id: ''
    }
  };

  componentDidMount() {
    this.getBudgets();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.budget.budgets !== nextProps.budget.budgets) {
      this.setState({ budget: nextProps.budget });
    }
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
    this.props.deleteBudget(budgetId).then(() => {
      // Update the budgets list
      this.getBudgets();
    });
  };

  renderBudgets = budget => {
    if (budget.budgets) {
      const budgets = budget.budgets;

      return budgets.map(budget => {
        return (
          <Table.Row verticalAlign="middle" key={budget._id} id={budget._id}>
            <Table.Cell
              onClick={this.setSelectedBudget}
              verticalAlign="middle"
              className="dashboard__budget"
            >
              <Icon
                name="edit outline"
                size="large"
                className="dashboard__budget-edit"
              />
              <span className="dashboard__budget-name">{budget.name}</span>
            </Table.Cell>

            <Table.Cell
              textAlign="center"
              width={1}
              onClick={this.deleteBudget}
            >
              <Icon
                name="delete"
                size="large"
                className="dashboard__budget-delete"
              />
            </Table.Cell>
          </Table.Row>
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
      <div className="dashboard page">
        <div className="dashboard__container">
          <div className="dashboard__budgets-heading">
            <h2 className="dashboard__budgets-header">Budgets List</h2>

            <button
              onClick={this.openCreateNew}
              className="button button__create-new"
            >
              + Create New
            </button>
          </div>

          <Table columns={2} className="dashboard__budgets-list">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Budget Name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {this.renderBudgets(this.props.budget)}
          </Table>
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
