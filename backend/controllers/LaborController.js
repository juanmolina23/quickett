const LaborModel = require("../models/Labor");

const LaborController = {
  get: async (req, res) => {
    const labor = await LaborModel.findById(req.params.id);
    res.json(labor);
  },
  getAll: async (req, res) => {
    const roles = await LaborModel.find({ ticket_id: req.params.id });
    res.json(roles);
  },
  add: async (req, res) => {
    const newLabor = new LaborModel(req.body);
    const savedLabor = await newLabor.save();
    res.json(savedLabor);
  },
  update: async (req, res) => {
    const updatedLabor = await LaborModel.findByIdAndUpdate(req.params.id, {
      rate: req.body.rate,
      time_spent: req.body.time_spent,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
    });
    res.json(updatedLabor);
  },
  delete: async (req, res) => {
    const deleted = await RoleModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  },
};

module.exports = LaborController;
