import React from 'react';
import { connect } from 'react-redux';

const BudgetHeader = props => {
  const renderHeading = () => {
    const name = props.data.name;
    return <p>Currently viewing {name} budget</p>;
  };

  return <div>{renderHeading()}</div>;
};

const mapStateToProps = state => {
  return {
    data: state.budget.selected.data
  };
};

export default connect(mapStateToProps)(BudgetHeader);
