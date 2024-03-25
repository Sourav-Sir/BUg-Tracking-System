const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');

// Routes for bugs
router.post('/bugs', bugController.createBug);
router.get('/bugs', bugController.getAllBugs);
router.get('/bugs/:id', bugController.getBugById);
router.put('/bugs/:id', bugController.updateBug);
router.delete('/bugs/:id', bugController.deleteBug);

module.exports = router;
