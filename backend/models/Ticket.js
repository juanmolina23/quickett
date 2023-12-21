const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  ticket_id: {
    required: true,
    type: Number,
  },
  ticket_desc: {
    required: true,
    type: String,
  },
  type_id: {
    type: mongoose.Types.ObjectId,
    ref: "Type",
  },
  classification_id: {
    type: mongoose.Types.ObjectId,
    ref: "Classification",
  },
  status_id: {
    type: mongoose.Types.ObjectId,
    ref: "Status",
  },
  shop_id: {
    type: mongoose.Types.ObjectId,
    ref: "Shop",
  },
  lead_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  summary: {
    required: true,
    type: String,
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  reported_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
