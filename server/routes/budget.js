const express = require('express');
const passport = require('passport');

const budget = require('../controllers/budget/budget');

const router = express.Router();

// Token authentication strategy
const requireAuth = passport.authenticate('jwt', { session: false });

// Create new budget item
router.post('/create', requireAuth, budget.createNewBudget);

// Get all budgets for the current user
router.get('/fetch/all', requireAuth, budget.getAll);

// Get selected budget by name
router.get('/fetch/:id', requireAuth, budget.getById);

// Save/update selected budget by id
router.put('/save/:id', requireAuth, budget.saveById);

// Delete selected budget by id
router.delete('/delete/:id', requireAuth, budget.deleteById);

module.exports = router;
