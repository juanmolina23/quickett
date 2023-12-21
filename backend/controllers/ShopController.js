const ShopModel = require("../models/Shop");

const ShopController = {
  get: async (req, res) => {
    const shop = await ShopModel.findById(req.params.id);
    res.json(shop);
  },
  getAll: async (req, res) => {
    const shops = await ShopModel.find();
    res.json(shops);
  },
  add: async (req, res) => {
    const newShop = new ShopModel(req.body);
    const savedShops = await newShop.save();
    res.json(savedShops);
  },
  update: async (req, res) => {
    const updatedShop = await ShopModel.findByIdAndUpdate(req.params.id, {
      shop_desc: req.body.shop_desc,
      shop_lead: req.body.shop_lead,
    });
    res.json(updatedShop);
  },
  delete: async (req, res) => {
    const deleted = await ShopModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  },
};

module.exports = ShopController;
