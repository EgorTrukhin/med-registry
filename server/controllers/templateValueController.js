const { TemplateValue } = require("../models/models");
const ApiError = require("../error/ApiError");

class TemplateValueController {
    async create(req, res) {
        const { value, templateAttrIdent } = req.body;
        const templateValue = await TemplateValue.create({ value, templateAttrIdent });
        return res.json(templateValue);
    }

    async delete(req, res) {
        const { id } = req.params;
        const templateValue = await TemplateValue.destroy({where: {id}});
        return res.json(templateValue)
    }

    async edit(req, res) {
        const { value, templateAttrIdent } = req.body;
        const { id } = req.params;
        const templateValue = await TemplateValue.update({ value, templateAttrIdent }, {where: {id}});
        return res.json(templateValue)
    }

    async getAll(req, res) {
        const templateValues = await TemplateValue.findAll();
        return res.json(templateValues);
    }
}

module.exports = new TemplateValueController();