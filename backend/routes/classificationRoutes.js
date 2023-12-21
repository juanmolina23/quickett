const express = require("express");
const ClassificationController = require("../controllers/ClassificationController");

const router = express.Router();

router.get("/", ClassificationController.getAll);

router.post("/", ClassificationController.add);

router.delete("/:id", ClassificationController.delete);

module.exports = router;
