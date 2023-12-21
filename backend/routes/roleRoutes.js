const express = require("express");
const RoleController = require('../controllers/RoleController');

const router = express.Router();

router.get("/", RoleController.getAll);

router.get("/:id", RoleController.get);

router.post('/create', RoleController.add);

router.delete('/:id', RoleController.delete);

module.exports = router;
