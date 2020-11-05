const mongoose = require('mongoose');

const shaharSchema = new mongoose.Schema({

  name: { type: String },
  children: [
    {
      child_01: { type: String },
      child_02: { type: String },
    }
  ]
});

const Shahar = mongoose.model('Shahar', shaharSchema);

module.exports = Shahar;