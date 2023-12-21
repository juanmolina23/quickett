const express = require("express");
const LaborController = require("../controllers/LaborController");

const router = express.Router();

router.get("/", LaborController.getAll);

router.get("/:id", LaborController.get);

router.post("/", LaborController.add);

router.put("/:id", LaborController.update);

router.delete("/:id", LaborController.delete);

module.exports = router;
