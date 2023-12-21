const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
  role_id: {
    type: mongoose.Types.ObjectId,
    ref: "Role",
  },
});

module.exports = mongoose.model("User", UserSchema);
