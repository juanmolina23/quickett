const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/", UserController.getUser);

router.get("/all", UserController.getAll);

module.exports = router;
