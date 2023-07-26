// Import the Express module to use its features
const express = require("express");

// Import the recipes data from the __mockdata__.json file
const recipes = require("../data/__mockdata__.json");

// Import your custom authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// Create a new router object
const router = express.Router();

// For each recipe in the recipes array...
recipes.forEach((recipe) => {
  // Define a GET route for the path "/recipe/<recipe id>"
  // Use the authentication middleware for this route
  // When a GET request is made to this path, send the current recipe data as a JSON response
  router.get(`/recipe/${recipe.id}`, authMiddleware, (req, res) => {
    res.json(recipe);
  });
});

// Export the router object so it can be imported in other files
module.exports = router;
