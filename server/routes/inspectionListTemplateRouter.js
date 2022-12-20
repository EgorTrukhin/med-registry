const Router = require("express");
const router = new Router();
const InspectionListTemplateController = require("../controllers/inspectionListTemplateController");

router.post("/create", InspectionListTemplateController.create);
router.get("/delete/:id", InspectionListTemplateController.delete);
router.post("/edit/:id", InspectionListTemplateController.edit);
router.get("/", InspectionListTemplateController.getAll);

module.exports = router;