const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Item = require("./item");
const User = require("./user");
const bcrypt = require("bcrypt");
var cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json()); // for parsing application/json
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`); // logging middleware
  next();
});
app.use(express.static("public"));
app.use(cors());

// middleware for checking JWT
function checkJwt(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
}

// middleware for checking admin role
function checkAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.post("/login", async (req, res) => {
  // 1. Check if the user exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username or password.");

  // 2. Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password.");

  // 3. Create and assign a token
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    "your_jwt_secret",
    { expiresIn: "1h" }
  );
  res.header("auth-token", token).send(token);
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.get("/items/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).send("Item not found");
  res.send(item);
});

app.post("/items", checkJwt, checkAdmin, async (req, res) => {
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    picture: req.body.picture,
  });
  await item.save();
  res.send(item);
});

app.put("/items/:id", checkJwt, checkAdmin, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!item) return res.status(404).send("Item not found");
  res.send(item);
});

app.delete("/items/:id", checkJwt, checkAdmin, async (req, res) => {
  const item = await Item.findByIdAndRemove(req.params.id);
  if (!item) return res.status(404).send("Item not found");
  res.send(item);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
