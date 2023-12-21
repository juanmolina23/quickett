const express = require("express");
const MaterialController = require("../controllers/MaterialController");

const router = express.Router();

router.get("/", MaterialController.getAll);

router.get("/:id", MaterialController.get);

router.post("/", MaterialController.add);

router.put("/:id", MaterialController.update);

router.delete("/:id", MaterialController.delete);

module.exports = router;
