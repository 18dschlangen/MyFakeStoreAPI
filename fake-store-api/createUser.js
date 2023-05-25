const mongoose = require("mongoose");
const User = require("./user");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const user = new User({
  username: "admin",
  password: "password123",
  isAdmin: true,
});

user
  .save()
  .then(() => {
    console.log("User created successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Error creating user:", err);
    process.exit(1);
  });
