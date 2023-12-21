const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const UserController = {
  login: async (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("Incorrect username/password");
      else {
        req.login(user, async (err) => {
          if (err) throw err;
          res.status(200);
          res.statusMessage = "Successfully Authenticated";
          const foundUser = await UserModel.findOne({
            username: user.username,
          }).populate("role_id");
          res.send({
            first_name: foundUser.first_name,
            last_name: foundUser.last_name,
            username: foundUser.username,
            role: foundUser.role_id,
          });
        });
      }
    })(req, res);
  },
  logout: async (req, res) => {
    req.logout(function (err) {
      if (err) throw err;
      req.session.destroy();
      res.send("Successfully logged out!");
    });
  },
  register: async (req, res) => {
    User.findOne({ username: req.body.username })
      .then(async (doc) => {
        if (doc) res.send("User already exists");
        if (!doc) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role_id: req.body.role_id,
          });
          await newUser.save();
          res.send("User Created");
        }
      })
      .catch((err) => {
        throw err;
      });
  },
  isAuth: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.send("User is not authenticated");
    }
  },
  getAll: async (req, res) => {
    const users = await UserModel.find()
      .populate("role_id")
      .select("-password");
    res.json(users);
  },
};

module.exports = UserController;
