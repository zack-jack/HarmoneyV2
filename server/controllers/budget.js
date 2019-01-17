const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const Budget = require('../models/Budget');
const User = require('../models/User');

// Decode the auth token to get the user id
const getUserIdFromToken = req => {
  if (req.headers && req.headers.authorization) {
    let decoded;
    const auth = req.headers.authorization;

    try {
      decoded = jwt.verify(auth, keys.tokenSecret);
    } catch (err) {
      console.log(err);
      return res.status(401).send('Unauthorized');
    }

    const userId = decoded.sub;
    return userId;
  }
};

// Create new budget
exports.createNewBudget = (req, res, next) => {
  let errors = [];
  let validData = undefined;
  const { name, income, expenses } = req.body;
  const userId = getUserIdFromToken(req);
  console.log(req.body);

  // Data validation checks and error messages
  if (!name || name === '') {
    errors.push({ message: 'Invalid name. Please try again.' });
  }

  if (name.length > 50) {
    errors.push({ message: 'Name must be shorter than 50 characters.' });
  }

  if (!name || !income || !expenses) {
    errors.push({ message: 'Error processing data. Please try again.' });
  }

  // Check if errors, then assign validData
  if (errors.length > 0) {
    validData = false;
    res.status(422).json({
      errors
    });
  } else {
    validData = true;
  }

  // If validData, proceed with creating record
  if (validData) {
    // Create new budget instance
    const newBudget = new Budget({
      owner: userId,
      name,
      income,
      expenses
    });

    // Save new budget record to DB
    newBudget
      .save()
      .then(budget => {
        // Respond that the user was created
        res.status(200).json({ success: 'New budget created' });
      })
      .catch(err => console.log(err));
  }
};

// Fetch all budgets for current user route handling
exports.getAll = (req, res, next) => {
  // Decode the auth token to get the user id
  // const userId = req.body.currentUser;
  // Budget.find({ owner: userId }).limit(12);
};
