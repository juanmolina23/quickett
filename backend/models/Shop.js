const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  shop_desc: {
    required: true,
    type: String,
  },
  shop_lead: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Shop", ShopSchema);
