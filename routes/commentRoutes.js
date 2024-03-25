const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Routes for comments
router.post('/bugs/:bugId/comments', commentController.createComment);
router.get('/bugs/:bugId/comments', commentController.getCommentsByBugId);
router.put('/comments/:commentId', commentController.updateComment);
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;
