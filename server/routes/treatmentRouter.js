const Router = require("express");
const router = new Router();
const TreatmentController = require("../controllers/treatmentController");

router.post("/create", TreatmentController.create);
router.get("/delete/:id", TreatmentController.delete);
router.post("/edit/:id", TreatmentController.edit);
router.get("/", TreatmentController.getAll);

module.exports = router;