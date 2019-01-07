const express = require('express');
const path = require('path');

const router = express.Router();

const { isAuth } = require('../config/auth');
const clientPath = '../../client';

// Welcome page
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, clientPath, 'build', 'index.html'));
});

module.exports = router;
