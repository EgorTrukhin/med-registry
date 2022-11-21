const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");

router.post("/create", typeController.create);
router.post("/edit/:id", typeController.edit);
router.get("/delete/:id", typeController.delete);
router.get("/", typeController.getAll);

module.exports = router;