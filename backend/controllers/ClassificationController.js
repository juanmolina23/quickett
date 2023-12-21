const ClassificationModel = require("../models/Classification");

const ClassificationController = {
  getAll: async (req, res) => {
    const classifications = await ClassificationModel.find();
    res.json(classifications);
  },
  add: async (req, res) => {
    const newClassification = new ClassificationModel(req.body);
    const savedClassification = await newClassification.save();
    res.json(savedClassification);
  },
  delete: async (req, res) => {
    const deleted = await ClassificationModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  },
};

module.exports = ClassificationController;
