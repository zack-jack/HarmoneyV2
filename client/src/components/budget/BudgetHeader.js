import React from 'react';
import { connect } from 'react-redux';

const BudgetHeader = props => {
  const name = props.data.name;

  return (
    <div>
      <p>Currently viewing {name} budget</p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.budget.selected.data
  };
};

export default connect(mapStateToProps)(BudgetHeader);
