const { Patient } = require("../models/models");
const ApiError = require("../error/ApiError");

class PatientController {
    async create(req, res) {
        const { firstName, secondName, middleName } = req.body;
        const patient = await Patient.create({ firstName, secondName, middleName });
        return res.json(patient);
    }

    async delete(req, res) {
        const { id } = req.params;
        const patient = await Patient.destroy({where: {id}});
        return res.json(patient)
    }

    async edit(req, res) {
        const { firstName, secondName, middleName } = req.body;
        const { id } = req.params;
        const patient = await Patient.update({ firstName, secondName, middleName }, {where: {id}});
        return res.json(patient)
    }

    async getAll(req, res) {
        const patients = await Patient.findAll();
        return res.json(patients);
    }
}

module.exports = new PatientController();