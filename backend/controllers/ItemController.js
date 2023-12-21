const ItemModel = require("../models/Item");

const ItemController = {
  getAll: async (req, res) => {
    const items = await ItemModel.find();
    res.json(items);
  },
  add: async (req, res) => {
    const newItem = new ItemModel(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  },
  update: async (req, res) => {
    const updatedItem = await ItemModel.findByIdAndUpdate(req.params.id, {
      item_desc: req.body.item_desc,
      stock: req.body.stock,
      cost: req.body.cost,
    });
    const savedItem = await updatedItem.save();
    res.json(savedItem);
  },
  delete: async (req, res) => {
    const deleted = await ItemModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  },
};

module.exports = ItemController;
