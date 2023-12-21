const mongoose = require("mongoose");

const LaborSchema = new mongoose.Schema({
  ticket_id: {
    type: mongoose.Types.ObjectId,
    ref: "Tickets",
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  rate: {
    required: true,
    type: String,
  },
  time_spent: {
    required: true,
    type: Number,
  },
  start_date: {
    required: true,
    type: Date,
  },
  end_date: {
    required: true,
    type: Date,
  },
});

module.exports = mongoose.model("Labor", LaborSchema);
