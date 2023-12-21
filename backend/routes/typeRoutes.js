const express = require("express");
const TypeController = require("../controllers/TypeController");

const router = express.Router();

router.get("/", TypeController.getAll);

router.get("/:id", TypeController.get);

router.post("/", TypeController.add);

router.delete("/:id", TypeController.delete);

module.exports = router;
