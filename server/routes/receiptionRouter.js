const Router = require("express");
const router = new Router();
const PatientController = require("../controllers/patientController");

router.post("/create", PatientController.create);
router.get("/delete/:id", PatientController.delete);
router.post("/edit/:id", PatientController.edit);
router.get("/", PatientController.getAll);

module.exports = router;