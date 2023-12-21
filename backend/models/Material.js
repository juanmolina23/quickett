const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  ticket_id: {
    type: mongoose.Types.ObjectId,
    ref: "Tickets",
  },
  item_id: {
    required: true,
    type: String,
  },
  num_used: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Material", MaterialSchema);
