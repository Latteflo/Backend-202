// Import the Express module to use its features
const express = require("express");

// Import the recipes data from the __mockdata__.json file
const recipes = require("../data/__mockdata__.json");

// Import your custom authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// Create a new router object
const router = express.Router();

// Define a GET route for the root path ("/")
// Use the authentication middleware for this route
// When a GET request is made to the root path, send the recipes data as a JSON response
router.get("/", authMiddleware, (req, res) => {
  res.json(recipes);
});

// Export the router object so it can be imported in other files
module.exports = router;
