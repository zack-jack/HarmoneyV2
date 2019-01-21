import React from 'react';
import { connect } from 'react-redux';

const ExpensesList = props => {
  const deleteEntry = e => {
    const id = e.target.parentElement.parentElement.id;
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

export default connect(mapStateToProps)(ExpensesList);
