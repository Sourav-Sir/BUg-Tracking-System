const Bug = require('../models/Bug');
const Comment = require('../models/Comment');

// Create a new bug
exports.createBug = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const bug = new Bug({
      name,
      description,
      status: status || 'open'
    });
    const savedBug = await bug.save();
    res.status(201).json(savedBug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all bugs
exports.getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.status(200).json(bugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Get bug by ID with comments populated
exports.getBugById = async (req, res) => {
  try {
    const bugId = req.params.id;
    
    // Find the bug by ID and populate its comments field
    const bug = await Bug.findById(bugId).populate('comments');

    if (!bug) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    
    res.status(200).json(bug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Update a bug
exports.updateBug = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const bug = await Bug.findByIdAndUpdate(req.params.id, { name, description, status }, { new: true });
    if (!bug) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    res.status(200).json(bug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a bug
exports.deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) {
      return res.status(404).json({ error: 'Bug not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
