const RoleModel = require('../models/Role');

const RoleController = {
    get: async (req, res) => {
        const role = await RoleModel.findById(req.params.id);
        res.json(role);
    },
    getAll: async (req, res) => {
        const roles = await RoleModel.find();
        res.json(roles);
    },
    add: async (req,res) => {
        const newRole = new RoleModel(req.body);
        const savedRole = await newRole.save();
        res.json(savedRole);
    },
    delete: async (req, res) => {
        const deleted = await RoleModel.findByIdAndDelete(req.params.id);
        res.json(deleted)
    }
}

module.exports = RoleController;