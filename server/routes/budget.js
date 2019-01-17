const express = require('express');
const passport = require('passport');

const budget = require('../controllers/budget');

const router = express.Router();

// Token authentication strategy
const requireAuth = passport.authenticate('jwt', { session: false });

// Create new budget item
router.post('/create', requireAuth, budget.createNewBudget);

// Get all budgets associated with the current user
router.get('/fetch/all', requireAuth, budget.getAll);

// // Get selected budget
// router.get('/budget/:id', requireAuth, budget.getById);

// // Save budget
// router.put('/budget/:id', requireAuth, budget.saveById);

module.exports = router;
