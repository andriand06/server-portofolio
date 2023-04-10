const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/hero", apiController.hero);
router.get("/about", apiController.about);
router.get("/experience", apiController.experience);
router.get("/work", apiController.work);
module.exports = router;
