const Router = require("express");
const router = new Router();
const TemplateAttrController = require("../controllers/templateAttrController");

router.post("/create", TemplateAttrController.create);
router.get("/delete/:id", TemplateAttrController.delete);
router.post("/edit/:ident", TemplateAttrController.edit);
router.get("/", TemplateAttrController.getAll);
router.get("/:inspectionListTemplateId", TemplateAttrController.getByTemplateId);

module.exports = router;