const mongoose = require("mongoose");

const ClassificationSchema = new mongoose.Schema({
  classification_desc: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Classification", ClassificationSchema);
