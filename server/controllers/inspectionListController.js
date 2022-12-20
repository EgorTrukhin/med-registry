const { InspectionList } = require("../models/models");
const ApiError = require("../error/ApiError");

class InspectionListController {
    async create(req, res) {
        const { listName, filledTemplateId } = req.body;
        const inspectionList = await InspectionList.create({ listName, filledTemplateId });
        return res.json(inspectionList);
    }

    async delete(req, res) {
        const { id } = req.params;
        const inspectionList = await InspectionList.destroy({where: {id}});
        return res.json(inspectionList)
    }

    async edit(req, res) {
        const { listName, filledTemplateId } = req.body;
        const { id } = req.params;
        const inspectionList = await InspectionList.update({ listName, filledTemplateId }, {where: {id}});
        return res.json(inspectionList)
    }

    async getAll(req, res) {
        const inspectionLists = await InspectionList.findAll();
        return res.json(inspectionLists);
    }
}

module.exports = new InspectionListController();