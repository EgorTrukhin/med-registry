const { AppointmentList } = require("../models/models");
const ApiError = require("../error/ApiError");

class AppointmentListController {
    async create(req, res) {
        const { listName, roomNumber, dietId, treatmentId } = req.body;
        const appointmentList = await AppointmentList.create({ listName, roomNumber, dietId, treatmentId });
        return res.json(appointmentList);
    }

    async delete(req, res) {
        const { id } = req.params;
        const appointmentList = await AppointmentList.destroy({where: {id}});
        return res.json(appointmentList)
    }

    async edit(req, res) {
        const { listName, roomNumber, dietId, treatmentId } = req.body;
        const { id } = req.params;
        const appointmentList = await AppointmentList.update({ listName, roomNumber, dietId, treatmentId }, {where: {id}});
        return res.json(appointmentList)
    }

    async getAll(req, res) {
        const appointmentLists = await AppointmentList.findAll();
        return res.json(appointmentLists);
    }
}

module.exports = new AppointmentListController();