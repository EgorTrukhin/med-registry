const Router = require("express");
const router = new Router();
const AppointmentListController = require("../controllers/appointmentListController");

router.post("/create", AppointmentListController.create);
router.get("/delete/:id", AppointmentListController.delete);
router.post("/edit/:id", AppointmentListController.edit);
router.get("/", AppointmentListController.getAll);

module.exports = router;