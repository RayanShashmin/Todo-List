const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  priority: {
    type: Number, // Assuming priority is a numeric field
    default: 0,   // Default priority, adjust as necessary
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
