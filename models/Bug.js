const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'in progress', 'resolved'], default: 'open' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // Reference to Comment model
}, { timestamps: true });

module.exports = mongoose.model('Bug', bugSchema);
