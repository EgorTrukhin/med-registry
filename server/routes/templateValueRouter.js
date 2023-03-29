const Router = require("express");
const router = new Router();
const TemplateValueController = require("../controllers/templateValueController");

router.post("/create", TemplateValueController.create);
router.get("/delete/:id", TemplateValueController.delete);
router.post("/edit/:id", TemplateValueController.edit);
router.get("/", TemplateValueController.getAll);
router.get("/:templateAttrIdent", TemplateValueController.getValuesByAttrIdent);

module.exports = router;