// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Enable parsing of JSON request bodies
app.use(express.json());

const API_KEY = process.env.API_KEY;
console.log(API_KEY);

// Add a middleware to check the API key
app.use((req, res, next) => {
  if (req.headers["x-api-key"] !== API_KEY) {
    console.log("x-api-key", req.headers["x-api-key"]);
    res.status(401).json({ message: "UOoopsieee - Uauthorized!" });
  } else {
    next();
  }
  console.log("Middleware executed");
});

// Define an array of recipes
const recipes = [
  {
    name: "Spaghetti Bolognese",
    timeToPrepare: 45,
    ingredients: [
      "Spaghetti",
      "Ground Beef",
      "Tomato Sauce",
      "Onion",
      "Garlic",
    ],
    steps: [
      "Boil the spaghetti",
      "Cook the ground beef",
      "Add the tomato sauce",
      "Serve with grated cheese",
    ],
  },
  {
    name: "Chicken Curry",
    timeToPrepare: 60,
    ingredients: [
      "Chicken",
      "Curry Powder",
      "Coconut Milk",
      "Onion",
      "Garlic",
      "Ginger",
    ],
    steps: [
      "Fry the onion, garlic, and ginger",
      "Add the chicken and curry powder",
      "Pour in the coconut milk and simmer",
      "Serve with rice",
    ],
  },
  {
    name: "Vegetable Stir Fry",
    timeToPrepare: 30,
    ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Soy Sauce", "Garlic"],
    steps: [
      "Chop the vegetables",
      "Fry the vegetables in a wok",
      "Add the soy sauce and garlic",
      "Serve with noodles or rice",
    ],
  },
  {
    name: "Tuna Salad",
    timeToPrepare: 15,
    ingredients: ["Tuna", "Mayonnaise", "Celery", "Onion"],
    steps: [
      "Drain the tuna",
      "Chop the celery and onion",
      "Mix the tuna, mayonnaise, celery, and onion",
      "Serve with bread or crackers",
    ],
  },
];

// Create a GET route that responds with the full list of recipes
app.get("/", (req, res) => {
  res.json(recipes);
});

// Create a GET route for each recipe
recipes.forEach((recipe, index) => {
  app.get(`/recipe/${index}`, (req, res) => {
    res.json(recipe);
  });
});

// Create a GET route for the info page
app.get("/info", (req, res) => {
  res.json({
    message:
      "This is a simple Recipe API. Use the correct API key to access the data.",
  });
});

// Define the port the server will listen on
const PORT = 3000;

// Start the server and log the port it's running on
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
