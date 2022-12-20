const { InspectionListTemplate } = require("../models/models");
const ApiError = require("../error/ApiError");

class InspectionListTemplateController {
    async create(req, res) {
        const { templateName, content } = req.body;
        const inspectionListTemplate = await InspectionListTemplate.create({ templateName, content });
        return res.json(inspectionListTemplate);
    }

    async delete(req, res) {
        const { id } = req.params;
        const inspectionListTemplate = await InspectionListTemplate.destroy({where: {id}});
        return res.json(inspectionListTemplate)
    }

    async edit(req, res) {
        const { templateName, content } = req.body;
        const { id } = req.params;
        const inspectionListTemplate = await InspectionListTemplate.update({ templateName, content }, {where: {id}});
        return res.json(inspectionListTemplate)
    }

    async getAll(req, res) {
        const inspectionListTemplates = await InspectionListTemplate.findAll();
        return res.json(inspectionListTemplates);
    }
}

module.exports = new InspectionListTemplateController();