const Budget = require('../../models/Budget');
const getUserIdFromToken = require('./utils').getUserIdFromToken;
const getDataValidationErrors = require('./utils').getDataValidationErrors;
const setValidation = require('./utils').setValidation;
const checkUserIdExists = require('./utils').checkUserIdExists;

// Create new budget
exports.createNewBudget = (req, res, next) => {
  let errors, validData;
  const { name, income, expenses } = req.body;
  const headers = req.headers;
  const token = req.headers.authorization;

  // Get user id from request header
  const userId = getUserIdFromToken(headers, token);

  // Validate data and get errors
  errors = getDataValidationErrors(userId, name, income, expenses);

  // Check if errors, then assign validData
  validData = setValidation(errors);

  if (!validData) {
    res.status(422).json({
      errors
    });
  } else {
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
        res.status(200).json({ success: 'New budget created successfully' });
      })
      .catch(err => console.log(err));
  }
};

// Fetch all budgets for current user route handling
exports.getBudgets = (req, res, next) => {
  const headers = req.headers;
  const token = req.headers.authorization;

  // Get user id from request header
  const userId = getUserIdFromToken(headers, token);

  // Ensure user exists and is auth
  const userExists = checkUserIdExists(userId);

  if (!userExists) {
    res.status(401).json({ error: 'Invalid credentials. Please log in.' });
  } else {
    // Send docs that match user id
    Budget.find({ owner: userId })
      .then(docs => {
        if (docs) {
          const budgets = docs.map(budget => {
            return {
              _id: budget._id,
              name: budget.name
            };
          });

          res.status(200).json(budgets);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

exports.getBudgetById = (req, res, next) => {
  const budgetId = req.params.id;
  const headers = req.headers;
  const token = req.headers.authorization;

  // Get user id from request header
  const userId = getUserIdFromToken(headers, token);

  // Ensure user exists and is auth
  const userExists = checkUserIdExists(userId);

  if (!userExists) {
    res.status(401).json({ error: 'Invalid credentials. Please log in.' });
  } else {
    // Query database for budgetId that belongs to userId
    if (budgetId) {
      Budget.findOne({ owner: userId, _id: budgetId })
        .then(doc => {
          if (doc) {
            res.status(200).json(doc);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return res.status(404).json({ error: 'Requested budget was not found.' });
    }
  }
};

exports.saveBudgetById = (req, res, next) => {
  let errors = [];
  let validData;
  const { name, income, expenses } = req.body;
  const budgetId = req.params.id;
  const userId = getUserIdFromToken(req);

  // Validate data and get errors
  errors = getDataValidationErrors(userId, name, income, expenses);

  // Ensure user exists and is auth
  checkUserIdExists(userId);

  // Check if errors, then assign validData
  validData = setValidation(errors);

  // If id exists, update for this user
  if (budgetId) {
    Budget.findOneAndUpdate(
      { owner: userId, _id: budgetId },
      { name, income, expenses }
    )
      .then(doc => {
        if (doc) {
          res.status(200).json({ success: 'Saved successfully' });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    return res.status(404).json({ error: 'Requested budget was not found.' });
  }
};

exports.deleteBudgetById = (req, res, next) => {
  const budgetId = req.params.id;
  const userId = getUserIdFromToken(req);

  // Ensure user exists and is auth
  checkUserIdExists(userId);

  // If id exists, delete this doc for this user
  if (budgetId) {
    Budget.findOneAndDelete({ owner: userId, _id: budgetId })
      .then(doc => {
        if (doc) {
          res.status(200).json({ success: 'Deleted successfully' });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    return res.status(404).json({ error: 'Requested budget was not found.' });
  }
};
