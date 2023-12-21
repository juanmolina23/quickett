const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  role_desc: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Role", RoleSchema);
