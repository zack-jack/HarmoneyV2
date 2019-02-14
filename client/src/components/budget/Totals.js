import React, { Component } from 'react';

class Totals extends Component {
  state = {
    incomeTotal: parseFloat(0).toFixed(2),
    incomeLength: this.props.data.income.length,
    expensesTotal: parseFloat(0).toFixed(2),
    expensesLength: this.props.data.expenses.length
  };

  componentDidMount() {
    this.getTotals(this.props.data.income);
    this.getTotals(this.props.data.expenses);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.data.income);
    if (prevProps.data.income.length !== this.state.incomeLength) {
      this.getTotals(prevProps.data.income);

      this.setState({ incomeLength: prevProps.data.income.length });
    }

    // if (prevProps.data.expenses.length !== this.state.expensesLength) {
    //   this.getTotals(this.props.data.expenses);
    // }
  }

  componentWillReceiveProps(nextProps) {
    this.getTotals(nextProps.data.income);
    this.getTotals(nextProps.data.expenses);
  }

  getTotals = items => {
    let total;

    if (items && items.length === 1) {
      total = parseFloat(items[0].amount).toFixed(2);
    } else if (items && items.length > 1) {
      total = items.reduce((a, b) => {
        return (parseFloat(a.amount) + parseFloat(b.amount)).toFixed(2);
      });
    } else {
      total = parseFloat(0).toFixed(2);
    }

    if (items && items.length > 0) {
      if ((items.id || items[0].type) === 'income') {
        this.setState({ incomeTotal: total });
      }

      if (items.id === 'expenses' || items[0].type === 'expense') {
        this.setState({ expensesTotal: total });
      }
    }

    if (items.length === 0) {
      if (this.props.data.income.length === 0) {
        this.setState({ incomeTotal: parseFloat(0).toFixed(2) });
      }

      if (this.props.data.expenses.length === 0) {
        this.setState({ expensesTotal: parseFloat(0).toFixed(2) });
      }
    }
  };

  render() {
    return (
      <div>
        <h2 className="budget__totals-heading">Totals</h2>
        <div className="budget__totals-box">
          <div className="budget__totals-income">
            <div className="budget__totals-wrapper">
              <h3 className="budget__totals-income-header">Income</h3>
              <h3 id="income" className="budget__totals-income-amount">
                $ {this.state.incomeTotal}
              </h3>
            </div>
          </div>
          <div className="budget__totals-expenses">
            <div className="budget__totals-wrapper">
              <h3 className="budget__totals-expenses-header">Expenses</h3>
              <h3 id="expenses" className="budget__totals-expenses-amount">
                $ {this.state.expensesTotal}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Totals;
