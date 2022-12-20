const Router = require("express");
const router = new Router();
const DietController = require("../controllers/dietController");

router.post("/create", DietController.create);
router.get("/delete/:id", DietController.delete);
router.post("/edit/:id", DietController.edit);
router.get("/", DietController.getAll);

module.exports = router;