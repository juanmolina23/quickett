const express = require("express");
const StatusController = require("../controllers/StatusController");

const router = express.Router();

router.get("/", StatusController.getAll);

router.get("/:id", StatusController.get);

router.post("/", StatusController.add);

router.delete("/:id", StatusController.delete);

module.exports = router;
