const MaterialModel = require("../models/Material");

const MaterialController = {
  get: async (req, res) => {
    const material = await MaterialModel.findById(req.params.id);
    res.json(material);
  },
  getAll: async (req, res) => {
    const materials = await MaterialModel.find();
    res.json(materials);
  },
  add: async (req, res) => {
    const newMaterial = new MaterialModel(req.body);
    const savedMaterials = await newMaterial.save();
    res.json(savedMaterials);
  },
  update: async (req, res) => {
    const updatedMaterial = await MaterialModel.findByIdAndUpdate(
      req.params.id,
      {
        item_id: req.body.item_id,
        num_used: req.body.num_used,
      }
    );
    res.json(updatedMaterial);
  },
  delete: async (req, res) => {
    const deleted = await MaterialModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  },
};

module.exports = MaterialController;
