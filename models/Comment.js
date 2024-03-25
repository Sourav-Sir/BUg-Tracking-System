const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  bugId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bug' }, // Reference to Bug model
  text: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
