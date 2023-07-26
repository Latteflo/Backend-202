// Import the Express module to use its features
const express = require("express");

// Import the dotenv module to use environment variables from a .env file
const dotenv = require("dotenv");

// Load environment variables from a .env file into process.env
dotenv.config();

// Store the API key from the environment variables in a constant
const API_KEY = process.env.API_KEY;

// Define the authentication middleware
// This function will be called for each incoming request
const authMiddleware = (req, res, next) => {
  // Check if the x-api-key header of the request matches the stored API key
  if (req.headers["x-api-key"] !== API_KEY) {
    // console.log(`Received key: ${req.headers["x-api-key"]} , Expected key: ${API_KEY}`);
    // If it doesn't match, send a 401 Unauthorized response with a JSON message
    return res.status(401).json({ message: "Unauthorized!" });
  } else {
    // If it does match, call the next middleware or route handler
    next();
  }
};

// Export the authentication middleware so it can be imported in other files
module.exports = authMiddleware;
