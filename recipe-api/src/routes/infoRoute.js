// Import the Express module to use its features
const express = require("express");

// Import your custom authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// Create a new router object
const router = express.Router();

// Define an HTML string to send as a response for the /info route
const infoHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Info</title>
</head>
<body>
    <h1>This is a simple Recipe API</h1>
    <p>Use the correct API key to access the data.</p>
</body>
</html>
`;

// Define a GET route for the /info path
// Use the authentication middleware for this route
// When a GET request is made to the /info path, send the infoHTML string as a response
router.get("/info", authMiddleware, (req, res) => {
  res.send(infoHTML);
});

// Export the router object so it can be imported in other files
module.exports = router;
