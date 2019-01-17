const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');

// Decode the auth token to get the user id
exports.getUserIdFromToken = req => {
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

// Validate data and generate error messages
exports.getDataValidationErrors = (userId, name, income, expenses) => {
  let errors = [];

  if (!userId || userId === undefined) {
    errors.push({ message: 'Invalid credentials. Please log in.' });
  }

  if (!name || name === '') {
    errors.push({ message: 'Invalid name. Please try again.' });
  }

  if (name.length > 50) {
    errors.push({ message: 'Name must be shorter than 50 characters.' });
  }

  if (!name || !income || !expenses) {
    errors.push({ message: 'Error processing data. Please try again.' });
  }

  return errors;
};

// Check if errors, then assign validData
exports.setValidation = errors => {
  let validData;

  if (errors.length > 0) {
    validData = false;
    res.status(422).json({
      errors
    });
  } else {
    validData = true;
  }

  return validData;
};

// Ensure that user exists and is auth
exports.checkUserIdExists = userId => {
  if (!userId || userId === undefined) {
    return res
      .status(401)
      .json({ error: 'Invalid credentials. Please log in.' });
  }
};
