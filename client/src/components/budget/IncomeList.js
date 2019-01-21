import React from 'react';
import { connect } from 'react-redux';

const IncomeList = props => {
  const renderIncome = () => {
    const incomeArr = props.income;

    return incomeArr.map(income => {
      const { amount, description } = income;
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
