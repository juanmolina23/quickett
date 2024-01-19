const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const AuthController = {
  login: async (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user)
        res.send({ status: 401, message: "Incorrect username/password" });
      else {
        req.login(user, async (err) => {
          if (err) throw err;
          res.status(200);
          const foundUser = await UserModel.findOne({
            username: user.username,
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
        });
      }
    })(req, res);
  },
  logout: async (req, res) => {
    req.logout(function (err) {
      if (err) throw err;
      req.session.destroy();
      res.send({ status: 200, message: "Successfully logged out" });
    });
  },
  register: async (req, res) => {
    User.findOne({ username: req.body.username })
      .then(async (doc) => {
        if (doc) res.send({ status: 200, message: "User already exists" });
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
          res.send({
            status: 200,
            message: "User Successfully Created",
            data: {
              first_name: newUser.first_name,
              last_name: newUser.last_name,
              username: newUser.username,
              role: newUser.role_id,
            },
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  },
  isAuth: async (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.send({
        status: 200,
        message: "User Is Not Authenticated",
      });
    }
  },
};

module.exports = AuthController;
