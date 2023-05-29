const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String, // This assumes that you're storing a URL to the picture
    required: false, // You might not require a picture for every item
  },
});

module.exports = mongoose.model("Item", ItemSchema);
