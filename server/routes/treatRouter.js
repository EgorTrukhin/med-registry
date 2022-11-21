const Router = require("express");
const router = new Router();
const treatController = require("../controllers/treatController");

router.post("/create", treatController.create);
router.get("/delete/:id", treatController.delete);
router.post("/edit/:id", treatController.edit);
router.get("/", treatController.getAll);
router.get("/:typeId", treatController.getByTypeId);

module.exports = router;