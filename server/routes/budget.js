const express = require('express');
const passport = require('passport');

const budget = require('../controllers/budget/budget');

const router = express.Router();

// Token authentication strategy
const requireAuth = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err, info);
      return next(err, info);
    }

    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    req.user = user;
    next();
  })(req, res, next);
};

// Create new budget item
router.post('/create', requireAuth, budget.createNewBudget);

// Get all budgets for the current user
router.get('/fetch/all', requireAuth, budget.getBudgets);

// Get selected budget by name
router.get('/fetch/:id', requireAuth, budget.getBudgetById);

// Save/update selected budget by id
router.put('/save/:id', requireAuth, budget.saveBudgetById);

// Delete selected budget by id
router.delete('/delete/:id', requireAuth, budget.deleteBudgetById);

module.exports = router;
