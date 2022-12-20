const { Receiption } = require("../models/models");
const ApiError = require("../error/ApiError");

class ReceiptionController {
    async create(req, res) {
        const { receiptDate, patientId, inspectionListId, appointmentListId } = req.body;
        const receiption = await Receiption.create({ receiptDate, patientId, inspectionListId, appointmentListId });
        return res.json(receiption);
    }

    async delete(req, res) {
        const { id } = req.params;
        const receiption = await Receiption.destroy({where: {id}});
        return res.json(receiption)
    }

    async edit(req, res) {
        const { receiptDate, patientId, inspectionListId, appointmentListId } = req.body;
        const { id } = req.params;
        const receiption = await Receiption.update({ receiptDate, patientId, inspectionListId, appointmentListId }, {where: {id}});
        return res.json(receiption)
    }

    async getAll(req, res) {
        const receiptions = await Receiption.findAll();
        return res.json(receiptions);
    }
}

module.exports = new ReceiptionController();