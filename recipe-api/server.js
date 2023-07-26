// Import the Express module to create an Express app
const express = require("express");

// Import the dotenv module to load environment variables from a .env file
const dotenv = require("dotenv");

// Import your custom authentication middleware
const authMiddleware = require("./src/middleware/authMiddleware");

// Import your custom route handlers
const rootRoute = require("./src/routes/rootRoute");
const recipeRoute = require("./src/routes/recipeRoute");
const infoRoute = require("./src/routes/infoRoute");

// Call dotenv.config() to load environment variables from a .env file into process.env
dotenv.config();

// Create a new Express application
const app = express();

// Add a middleware function to parse incoming JSON payloads
app.use(express.json());

// Add your custom authentication middleware to the Express app
app.use(authMiddleware);

// Add your custom routes to the Express app
app.use(rootRoute);
app.use(recipeRoute);
app.use(infoRoute);

// Define the port number on which the server will listen
const PORT = 3000;

// Start the server and listen for connections on the specified port
// The callback function will be called once the server is running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
