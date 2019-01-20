import React, { Component } from 'react';

import BudgetForm from './BudgetForm';
import requireAuth from '../auth/requireAuth';

class NewBudget extends Component {
  render() {
    return (
      <div>
        <p>Create a new budget</p>
        <BudgetForm />
      </div>
    );
  }
}

export default requireAuth(NewBudget);
