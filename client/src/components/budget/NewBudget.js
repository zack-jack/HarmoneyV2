import React from 'react';

import BudgetForm from './BudgetForm';
import requireAuth from '../auth/requireAuth';

const NewBudget = () => {
  return (
    <div className="new-budget page">
      <div className="new-budget__container">
        <h2 className="new-budget__heading">Create a new budget</h2>
        <BudgetForm />
      </div>
    </div>
  );
};

export default requireAuth(NewBudget);
