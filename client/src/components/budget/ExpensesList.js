import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { deleteExpense } from '../../actions/budget';

const ExpensesList = props => {
  const deleteEntry = e => {
    const id = e.target.parentElement.parentElement.id;

    // Return list of entries minus the clicked id
    const newEntriesList = props.expenses.filter(item => {
      return item._id !== id;
    });

    // Pass list of remaining entries to delete action
    props.deleteExpense(newEntriesList);
  };

  const renderExpenses = () => {
    const { expenses } = props;

    return expenses.map(expense => {
      const { _id, amount, description } = expense;
      return (
        <li key={_id} id={_id}>
          <div>
            <p>{amount}</p>
            <p>{description}</p>
            <button onClick={deleteEntry}>Delete</button>
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

export default compose(
  connect(
    mapStateToProps,
    { deleteExpense }
  )
)(ExpensesList);
