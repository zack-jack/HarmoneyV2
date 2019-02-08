const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv').config();

// App setup
const app = express();

// Database setup
const db = process.env.MONGO_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));

// Routes
app.use('/dashboard', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/budget', require('./routes/budget'));

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React frontend app build folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'));
  });
}

// Server setup
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
