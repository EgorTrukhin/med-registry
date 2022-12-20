const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({name});
        return res.json(type);
    }

    async delete(req, res) {
        const { id } = req.params;
        const type = await Type.destroy({where: {id}});
        return res.json(type)
    }

    async edit(req, res) {
        const { name } = req.body;
        const { id } = req.params;
        const type = await Type.update({name}, {where: {id}});
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }
}

module.exports = new TypeController();