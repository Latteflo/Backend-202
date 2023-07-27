// Import the necessary module
const jwt = require('jsonwebtoken');

// Middleware for authenticating tokens
const authenticateToken = (req, res, next) => {
  // Extract the authorization header
  const authHeader = req.headers["authorization"];

  // Extract the token from the authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  // If there's no token, respond with 401 Unauthorized status code
  if (token == null) return res.sendStatus(401);

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // If the token is not valid, respond with 403 Forbidden status code
    if (err) return res.sendStatus(403);

    // If the token is valid, add the user to the request
    // This makes the user information available in downstream middleware and route handlers
    req.user = user;

    // Proceed to the next middleware in the pipeline
    next();
  });
};

// Export the middleware function for use in other files
module.exports = authenticateToken;
