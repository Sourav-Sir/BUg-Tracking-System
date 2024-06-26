const express = require('express');
const connectDB = require('./config/database'); // Import the connectDB function
const bugRoutes = require('./routes/bugRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB(); // Call the connectDB function

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
