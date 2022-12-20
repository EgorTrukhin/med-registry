const { Treatment } = require("../models/models");
const ApiError = require("../error/ApiError");

class TreatmentController {
    async create(req, res) {
        const { treatmentName } = req.body;
        const treatment = await Treatment.create({ treatmentName });
        return res.json(treatment);
    }

    async delete(req, res) {
        const { id } = req.params;
        const treatment = await Treatment.destroy({where: {id}});
        return res.json(treatment)
    }

    async edit(req, res) {
        const { treatmentName } = req.body;
        const { id } = req.params;
        const treatment = await Treatment.update({ treatmentName }, {where: {id}});
        return res.json(treatment)
    }

    async getAll(req, res) {
        const treatments = await Treatment.findAll();
        return res.json(treatments);
    }
}

module.exports = new TreatmentController();