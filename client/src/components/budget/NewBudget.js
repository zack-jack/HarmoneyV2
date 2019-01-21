import React from 'react';

import BudgetForm from './BudgetForm';
import requireAuth from '../auth/requireAuth';

const NewBudget = () => {
  return (
    <div>
      <p>Create a new budget</p>
      <BudgetForm />
    </div>
  );
};

export default requireAuth(NewBudget);
