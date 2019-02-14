import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import BudgetHeader from './BudgetHeader';
import Divider from '../common/Divider';
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
    },
    isLoading: false
  };

  componentDidMount() {
    // Fetch the current budget data from DB
    this.getSelectedBudgetData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      budget: {
        selected: {
          data: nextProps.budget.selected.data
        }
      }
    });
  }

  getSelectedBudgetData = () => {
    this.setState({ isLoading: true });

    const budgetId = this.props.budget.selected._id;

    // Fetch selected budget data with API call
    this.props.getBudgetById(budgetId).then(() => {
      this.updateBudgetState();
    });

    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 500);
  };

  updateBudgetState = () => {
    this.props.saveBudget(this.props.budget.selected.data);

    this.setState({
      budget: {
        selected: {
          data: this.props.budget.selected.data
        }
      }
    });
  };

  render = () => {
    return this.state.isLoading ? (
      <Dimmer active inverted>
        <Loader inverted size="massive" />
      </Dimmer>
    ) : (
      <div className="budget page">
        <BudgetHeader name={this.state.budget.selected.data.name} />
        <Totals data={this.state.budget.selected.data} />
        <EntryForm />

        <div className="budget__divider">
          <Divider />
        </div>
        <div className="budget__lists-container">
          <IncomeList
            income={this.state.budget.selected.data.income}
            updateBudgetState={this.updateBudgetState}
          />
          <ExpensesList
            expenses={this.state.budget.selected.data.expenses}
            updateBudgetState={this.updateBudgetState}
          />
        </div>
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
    { getBudgetById, saveBudget }
  ),
  requireAuth
)(Budget);
