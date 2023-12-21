const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  item_desc: {
    required: true,
    type: String,
  },
  stock: {
    required: true,
    type: Number,
  },
  cost: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
