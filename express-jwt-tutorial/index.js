// Load environment variables from .env file
require("dotenv").config();
console.log(process.env.ACCESS_TOKEN_SECRET);

// Import necessary modules
const express = require("express");
const jwt = require("jsonwebtoken");

// Initialize a new express application
const app = express();

// Serve static files from the client directory
app.use(express.static('client'));

// Middleware for parsing JSON bodies from HTTP requests
app.use(express.json());

// Route for signing in users
app.post("/signin", (req, res) => {
  // Extract email from request body
  const { email } = req.body;

  // Create a user object
  const user = { email };

  // Create an access token from the user object
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  // Respond with the access token
  res.json({ accessToken });
});

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

    // If the token is valid, add the user to the request and proceed to the next middleware
    req.user = user;
    next();
  });
};

// Route for accessing protected resources
app.get("/protected", authenticateToken, (req, res) => {
  // Respond with the email from the authenticated user
  res.json({ email: req.user.email });
});

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("We are aliveee on port 3000");
});
