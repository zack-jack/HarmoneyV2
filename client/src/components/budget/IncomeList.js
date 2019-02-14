import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';

import { deleteIncome } from '../../actions/budget';

const IncomeList = props => {
  const deleteEntry = e => {
    const id = e.target.id;

    // Return list of entries minus the clicked id
    const newEntriesList = props.income.filter(item => {
      return item._id !== id;
    });

    // Pass list of remaining entries to delete action
    props.deleteIncome(newEntriesList);

    props.updateBudgetState();
  };

  const renderIncome = () => {
    const incomeArr = props.income;

    return incomeArr.map(income => {
      const { _id, amount, description } = income;
      return (
        <Table.Row columns={3} key={_id} id={_id}>
          <Table.Cell width={4}>$ {parseFloat(amount).toFixed(2)}</Table.Cell>
          <Table.Cell width={6}>{description}</Table.Cell>
          <Table.Cell textAlign="center" width={2}>
            <Icon
              id={_id}
              name="delete"
              size="large"
              className="income__delete"
              onClick={deleteEntry}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <div className="income">
      {props.income && props.income.length > 0 ? (
        <>
          <h4 className="income__heading">Income</h4>
          <div className="income__table">
            <Table basic="very" singleLine striped unstackable>
              <Table.Body>{renderIncome()}</Table.Body>
            </Table>
          </div>
        </>
      ) : null}
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
