const { Treat } = require("../models/models");
const ApiError = require("../error/ApiError");

class TreatController {
    async create(req, res) {
        const { name, typeId } = req.body;
        const treat = await Treat.create({name, typeId});
        return res.json(treat);
    }

    async delete(req, res) {
        const { id } = req.params;
        const treat = await Treat.destroy({where: {id}});
        return res.json(treat)
    }

    async edit(req, res) {
        const { name, typeId } = req.body;
        const { id } = req.params;
        let treat;
        if (typeId) {
            treat = await Treat.update({name, typeId}, {where: {id}});
        } else {
            treat = await Treat.update({name}, {where: {id}});
        }
        return res.json(treat)
    }

    async getByTypeId(req, res) {
        const { typeId } = req.params;
        const treat = await Treat.findAll({where: {typeId}});
        return res.json(treat)
    }

    async getAll(req, res) {
        const treats = await Treat.findAll();
        return res.json(treats);
    }
}

module.exports = new TreatController();