import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

const IncomeList = props => {
  const renderIncome = () => {
    const incomeArr = props.income;

    return incomeArr.map(income => {
      const { amount, description } = income;
      return (
        <li key={uuid.v4()}>
          <div>
            <p>{amount}</p>
            <p>{description}</p>
            <button>Delete</button>
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

export default connect(mapStateToProps)(IncomeList);
