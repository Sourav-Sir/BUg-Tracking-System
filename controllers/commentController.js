const Comment = require('../models/Comment');
const Bug = require('../models/Bug');

// Create a new comment for a bug
exports.createComment = async (req, res) => {
  try {
    const { bugId } = req.params;
    const { text } = req.body;

    // Create the comment
    const comment = new Comment({ bugId, text });
    const savedComment = await comment.save();

    // Update the bug to include the comment ID
    const updatedBug = await Bug.findByIdAndUpdate(
      bugId,
      { $push: { comments: savedComment._id } },
      { new: true }
    );

    if (!updatedBug) {
      return res.status(404).json({ error: 'Bug not found' });
    }

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all comments for a bug
exports.getCommentsByBugId = async (req, res) => {
  try {
    const { bugId } = req.params;
    const comments = await Comment.find({ bugId });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
