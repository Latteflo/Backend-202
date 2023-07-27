// Import the necessary modules
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

// Initialize a new router
const router = express.Router();

// Define the protected route
router.get("/protected", authenticateToken, (req, res) => {
  // Respond with the email from the authenticated user
  res.json({ email: req.user.email });
});

// Export the router for use in other files
module.exports = router;
