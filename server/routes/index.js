const express = require('express');
const passport = require('passport');

const router = express.Router();

// Token authentication strategy
const requireAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err, info);
    }

    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    req.user = user;
    next();
  })(req, res, next);
};

// Welcome
router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Dashboard
router.get('/dashboard', requireAuth, (req, res) => {
  res.send('GET request to dashboard route');
});

module.exports = router;
