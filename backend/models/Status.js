const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  status_desc: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Status", StatusSchema);
