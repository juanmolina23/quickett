const StatusModel = require("../models/Status");

const StatusController = {
  get: async (req, res) => {
    const status = await StatusModel.findById(req.params.id);
    res.json(status);
  },
  getAll: async (req, res) => {
    const statuses = await StatusModel.find();
    res.json(statuses);
  },
  add: async (req, res) => {
    const newStatus = new StatusModel(req.body);
    const savedStatus = await newStatus.save();
    res.json(savedStatus);
  },
  delete: async (req, res) => {
    const deleted = await StatusModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  },
};

module.exports = StatusController;
