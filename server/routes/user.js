const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

// User Model
const User = require('../models/User');

// Handle register
router.post('/register', (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  let errors = [];

  // Check required fields completed
  if (!firstName || !lastName || !email || !password || !passwordConfirm) {
    errors.push({ msg: 'Please fill in all required fields' });
  }

  // Check password matches password2
  if (password !== passwordConfirm) {
    errors.push({ msg: 'Passwords do not match' });
  }

  // Check password length is greater than 8 chars
  if (password.length < 8) {
    errors.push({ msg: 'Password should be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.status(400).json({
      errors,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm
    });
  } else {
    // Validation passed
    User.findOne({ email }).then(user => {
      if (user) {
        // User already exists
        errors.push({ msg: 'Email is already registered' });
        res.status(400).json({
          errors,
          firstName,
          lastName,
          email,
          password,
          passwordConfirm
        });
      } else {
        // Create new user instance
        const newUser = new User({
          firstName,
          lastName,
          email,
          password
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }

            // Set password to hash value
            newUser.password = hash;

            // Save user to db
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Successfully registered. Please log in.'
                );
                res.redirect('/user/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login handler
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next);
});

// Logout handler
router.post('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Successfully logged out');
  res.redirect('/user/login');
});

module.exports = router;
