const TicketModel = require("../models/Ticket");

const TicketController = {
  get: async (req, res) => {
    const ticket = await TicketModel.findById(req.params.id);
    res.json(ticket);
  },
  getAll: async (req, res) => {
    const tickets = await TicketModel.find();
    res.json(tickets);
  },
  add: async (req, res) => {
    const newTicket = new TicketModel(req.body);
    const savedTicket = await newTicket.save();
    res.json(savedTicket);
  },
  update: async (req, res) => {
    const updatedTicket = await TicketModel.findByIdAndUpdate(req.params.id, {
      ticket_desc: req.body.ticket_desc,
      type_id: req.body.type_id,
      classification_id: req.body.classification_id,
      status_id: req.body.status_id,
      shop_id: req.body.shop_id,
      lead_id: req.body.lead_id,
      summary: req.body.summary,
    });
    res.json(updatedTicket);
  },
  delete: async (req, res) => {
    const deleted = await TicketModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  },
};

module.exports = TicketController;
