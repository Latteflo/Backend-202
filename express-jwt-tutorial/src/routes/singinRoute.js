// Import the necessary modules
const express = require("express");
const jwt = require("jsonwebtoken");

// Initialize a new router
const router = express.Router();

// Define the sign in route
router.post("/signin", (req, res) => {
  // Extract email from request body
  const { email } = req.body;

  // Create a user object
  const user = { email };

  // Create an access token from the user object
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  // Respond with the access token
  res.json({ accessToken });
});

// Export the router for use in other files
module.exports = router;
