// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require('./src/middleware/authMiddleware');
const singInRoute = require('./src/routes/singinRoute');
const protectedRoute = require('./src/routes/protectedRoute');

// Initialize a new express application
const app = express();

// Middleware for parsing JSON bodies from HTTP requests
app.use(express.json());

// Serve static files from the client directory
app.use(express.static('./src/client'));

// Use the routes
app.use('/', singInRoute);
app.use('/', protectedRoute);

// Start the server on port 3000
app.listen(3000, () => {
  console.log("We are aliveee on port 3000");
});
