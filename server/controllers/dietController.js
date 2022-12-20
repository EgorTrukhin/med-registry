const { Diet } = require("../models/models");
const ApiError = require("../error/ApiError");

class DietController {
    async create(req, res) {
        const { dietName } = req.body;
        const diet = await Diet.create({ dietName });
        return res.json(diet);
    }

    async delete(req, res) {
        const { id } = req.params;
        const diet = await Diet.destroy({where: {id}});
        return res.json(diet)
    }

    async edit(req, res) {
        const { dietName } = req.body;
        const { id } = req.params;
        const diet = await Diet.update({ dietName }, {where: {id}});
        return res.json(diet)
    }

    async getAll(req, res) {
        const diets = await Diet.findAll();
        return res.json(diets);
    }
}

module.exports = new DietController();