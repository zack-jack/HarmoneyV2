import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Table, Icon } from 'semantic-ui-react';

import { deleteExpense } from '../../actions/budget';

const ExpensesList = props => {
  const deleteEntry = e => {
    const id = e.target.id;

    // Return list of entries minus the clicked id
    const newEntriesList = props.expenses.filter(item => {
      return item._id !== id;
    });

    // Pass list of remaining entries to delete action
    props.deleteExpense(newEntriesList).then(() => {
      props.updateBudgetState();
    });
  };

  const renderExpenses = () => {
    const { expenses } = props;

    return expenses.map(expense => {
      const { _id, amount, description } = expense;
      return (
        <Table.Row columns={3} key={_id} id={_id}>
          <Table.Cell width={4}>$ {parseFloat(amount).toFixed(2)}</Table.Cell>
          <Table.Cell width={6}>{description}</Table.Cell>
          <Table.Cell textAlign="center" width={2}>
            <Icon
              id={_id}
              name="delete"
              size="large"
              className="expenses__delete"
              onClick={deleteEntry}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <div className="expenses">
      {props.expenses && props.expenses.length > 0 ? (
        <>
          <h4 className="expenses__heading">Expenses</h4>

          <div className="expenses__table">
            <Table basic="very" singleLine striped unstackable>
              <Table.Body>{renderExpenses()}</Table.Body>
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
    { deleteExpense }
  )
)(ExpensesList);
