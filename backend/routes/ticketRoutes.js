const express = require("express");
const TicketController = require("../controllers/TicketController");

const router = express.Router();

router.get("/", TicketController.getAll);

router.get("/:id", TicketController.get);

router.post("/", TicketController.add);

router.put("/:id", TicketController.update);

router.delete("/:id", TicketController.delete);

module.exports = router;
