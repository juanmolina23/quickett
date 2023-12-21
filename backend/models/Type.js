const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  type_desc: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Type", TypeSchema);
