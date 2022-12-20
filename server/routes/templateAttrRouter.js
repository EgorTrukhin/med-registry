const Router = require("express");
const router = new Router();
const TemplateAttrController = require("../controllers/templateAttrController");

router.post("/create", TemplateAttrController.create);
router.get("/delete/:id", TemplateAttrController.delete);
router.post("/edit/:id", TemplateAttrController.edit);
router.get("/", TemplateAttrController.getAll);

module.exports = router;