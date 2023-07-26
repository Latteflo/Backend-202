require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.post("/singin", (req, res) => {
  const { email } = req.body;
  const user = { email };

  const accessToken = jws.sing(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ email: req.user.email });
});

app.listen(3000, () => {
  console.log("We are aliveee on port 3000");
});
