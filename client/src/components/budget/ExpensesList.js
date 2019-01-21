import React from 'react';
import { connect } from 'react-redux';

const ExpensesList = props => {
  const renderExpenses = () => {
    const { expenses } = props;

    return expenses.map(expense => {
      const { amount, description } = expense;
      return (
        <li>
          <div>
            <p>{amount}</p>
            <p>{description}</p>
          </div>
        </li>
      );
    });
  };

  return (
    <div>
      {props.expenses.length > 0 ? <p>Expenses</p> : <p>{''}</p>}

      <ul>{renderExpenses()}</ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.budget.selected.data
  };
};

export default connect(mapStateToProps)(ExpensesList);
