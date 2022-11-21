const Router = require("express");
const router = new Router();
const typeRouter = require("./typeRouter");
const treatRouter = require("./treatRouter");

router.use("/type", typeRouter);
router.use("/treat", treatRouter);

module.exports = router;