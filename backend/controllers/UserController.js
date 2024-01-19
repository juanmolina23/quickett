const UserModel = require("../models/User");

const UserController = {
  getUser: async (req, res) => {
    const foundUser = await UserModel.findOne({
      username: req.user.username,
    }).populate("role_id");
    res.send({
      status: 200,
      message: "Successfully Authenticated",
      data: {
        first_name: foundUser.first_name,
        last_name: foundUser.last_name,
        username: foundUser.username,
        role: foundUser.role_id,
      },
    });
  },
  getAll: async (req, res) => {
    const users = await UserModel.find()
      .populate("role_id")
      .select("-password");
    res.json(users);
  },
};

module.exports = UserController;
