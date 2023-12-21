const express = require("express");
const ShopController = require("../controllers/ShopController");

const router = express.Router();

router.get("/", ShopController.getAll);

router.get("/:id", ShopController.get);

router.post("/", ShopController.add);

router.put("/:id", ShopController.update);

router.delete("/:id", ShopController.delete);

module.exports = router;
