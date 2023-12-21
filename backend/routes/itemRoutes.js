const express = require("express");
const ItemController = require("../controllers/ItemController");

const router = express.Router();

router.get("/", ItemController.getAll);

router.post("/", ItemController.add);

router.put("/:id", ItemController.update);

router.delete("/:id", ItemController.delete);

module.exports = router;
