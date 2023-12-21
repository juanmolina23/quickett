const TypeModel = require("../models/Type");

const TypeController = {
  get: async (req, res) => {
    const type = await TypeModel.findById(req.params.id);
    res.json(type);
  },
  getAll: async (req, res) => {
    const types = await TypeModel.find();
    res.json(types);
  },
  add: async (req, res) => {
    const newType = new TypeModel(req.body);
    const savedType = await newType.save();
    res.json(savedType);
  },
  delete: async (req, res) => {
    const deleted = await TypeModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  },
};

module.exports = TypeController;
