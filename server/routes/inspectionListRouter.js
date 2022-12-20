const Router = require("express");
const router = new Router();
const InspectionListController = require("../controllers/inspectionListController");

router.post("/create", InspectionListController.create);
router.get("/delete/:id", InspectionListController.delete);
router.post("/edit/:id", InspectionListController.edit);
router.get("/", InspectionListController.getAll);

module.exports = router;