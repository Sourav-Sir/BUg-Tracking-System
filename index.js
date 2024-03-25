const express = require('express');
const mongoose = require('mongoose');
const bugRoutes = require('./routes/bugRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bugTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1); // Exit with failure
});

// Routes
app.use('/api', bugRoutes);
app.use('/api', commentRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
