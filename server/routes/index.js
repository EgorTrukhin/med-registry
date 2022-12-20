const Router = require("express");
const router = new Router();
const typeRouter = require("./typeRouter");
const treatRouter = require("./treatRouter");
const patientRouter = require("./patientRouter");
const receiptionRouter = require("./receiptionRouter");
const inspectionListRouter = require("./inspectionListRouter");
const appointmentListRouter = require("./appointmentListRouter");
const treatmentRouter = require("./treatmentRouter");
const dietRouter = require("./dietRouter");
const inspectionListTemplateRouter = require("./inspectionListTemplateRouter");
const templateAttrRouter = require("./templateAttrRouter");
const templateValueRouter = require("./templateValueRouter");

router.use("/type", typeRouter);
router.use("/treat", treatRouter);
router.use("/patient", patientRouter);
router.use("/receiption", receiptionRouter);
router.use("/inspectionList", inspectionListRouter);
router.use("/appointmentList", appointmentListRouter);
router.use("/treatment", treatmentRouter);
router.use("/diet", dietRouter);
router.use("/inspectionListTemplate", inspectionListTemplateRouter);
router.use("/templateAttr", templateAttrRouter);
router.use("/templateValue", templateValueRouter);

module.exports = router;