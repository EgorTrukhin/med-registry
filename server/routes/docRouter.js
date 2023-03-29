const Router = require("express");
const router = new Router();
const DocController = require("../controllers/docController");

router.post("/excel", DocController.excel);
router.post("/word", DocController.word);

module.exports = router;