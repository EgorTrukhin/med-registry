const { TemplateAttr } = require("../models/models");
const ApiError = require("../error/ApiError");

class TemplateAttrController {
    async create(req, res) {
        const { ident, description, inspectionListTemplateId } = req.body;
        const templateAttr = await TemplateAttr.create({ ident, description, inspectionListTemplateId });
        return res.json(templateAttr);
    }

    async delete(req, res) {
        const { ident } = req.params;
        const templateAttr = await TemplateAttr.destroy({where: {ident}});
        return res.json(templateAttr)
    }

    async edit(req, res) {
        const { description, inspectionListTemplateId } = req.body;
        const { ident } = req.params;
        const templateAttr = await TemplateAttr.update({ description, inspectionListTemplateId }, {where: {ident}});
        return res.json(templateAttr)
    }

    async getAll(req, res) {
        const templateAttrs = await TemplateAttr.findAll();
        return res.json(templateAttrs);
    }
}

module.exports = new TemplateAttrController();