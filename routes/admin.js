const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");
const { upload, uploadMultiple } = require("../middlewares/multer");
router.get("/signin", adminController.viewSignin);
router.post("/signin", adminController.actionLogin);
router.use(auth);
router.get("/logout", adminController.actionLogout);
router.get("/dashboard", adminController.viewDashboard);

router.get("/hero", adminController.viewHero);
router.post("/hero", adminController.addHero);
router.put("/hero", adminController.updateHero);
router.delete("/hero", adminController.deleteHero);

router.get("/about", adminController.viewAbout);
router.post("/about", adminController.addAbout);
router.put("/about", adminController.updateAbout);
router.delete("/about", adminController.deleteAbout);

router.get("/tech", adminController.viewTech);
router.post("/tech", adminController.addTech);
router.put("/tech", adminController.updateTech);
router.delete("/tech", adminController.deleteTech);

router.get("/list", adminController.viewList);
router.post("/list", adminController.addList);
router.put("/list", adminController.updateList);
router.delete("/list", adminController.deleteList);

router.get("/tab", adminController.viewTab);
router.post("/tab", adminController.addTab);
router.put("/tab", adminController.updateTab);
router.delete("/tab", adminController.deleteTab);

router.get("/job", adminController.viewJob);
router.post("/job", adminController.addJob);
router.put("/job", adminController.updateJob);
router.delete("/job", adminController.deleteJob);

router.get("/project", adminController.viewProject);
router.post("/project", upload, adminController.addProject);
router.put("/project", upload, adminController.updateProject);
router.delete("/project", adminController.deleteProject);

router.get("/tool", adminController.viewTool);
router.post("/tool", adminController.addTool);
router.put("/tool", adminController.updateTool);
router.delete("/tool", adminController.deleteTool);
module.exports = router;
