const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Define budget model
const budgetSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  name: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },
  income: {
    type: Array,
    default: []
  },
  expenses: {
    type: Array,
    default: []
  }
});

// Model class
const Budget = model('Budget', budgetSchema);

module.exports = Budget;
