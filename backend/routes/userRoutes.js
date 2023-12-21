const express = require("express");
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/login', UserController.login);

router.post("/logout", UserController.logout);

router.post("/register", UserController.register);

router.get('/user/', UserController.getAll);

module.exports = router;
