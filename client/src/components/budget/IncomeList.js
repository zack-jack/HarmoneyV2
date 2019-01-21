import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { deleteIncome } from '../../actions/budget';

const IncomeList = props => {
  const deleteEntry = e => {
    const id = e.target.parentElement.parentElement.id;

    // Return list of entries minus the clicked id
    const newEntriesList = props.income.filter(item => {
      return item._id !== id;
    });

    // Pass list of remaining entries to delete action
    props.deleteIncome(newEntriesList);
  };

  const renderIncome = () => {
    const incomeArr = props.income;

    return incomeArr.map(income => {
      const { _id, amount, description } = income;
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
      {props.income.length > 0 ? <p>Income</p> : <p>{''}</p>}

      <ul>{renderIncome()}</ul>
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
    { deleteIncome }
  )
)(IncomeList);
