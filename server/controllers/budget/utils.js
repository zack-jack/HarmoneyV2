const jwt = require('jsonwebtoken');

require('dotenv').config();

// Decode the auth token to get the user id
exports.getUserIdFromToken = (headers, token) => {
  if (headers && token) {
    let decoded;
    const auth = token;

    try {
      decoded = jwt.verify(auth, process.env.TOKEN_SECRET);
      const userId = decoded.sub;

      return userId;
    } catch (err) {
      return err;
    }
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
  } else {
    validData = true;
  }

  return validData;
};

// Ensure that user exists and is auth
exports.checkUserIdExists = userId => {
  if (!userId || userId === undefined) {
    return false;
  } else {
    return true;
  }
};
