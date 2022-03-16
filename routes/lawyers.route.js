const { Router } = require("express");
const { lawyersController } = require("../controllers/lawyers.controller");
const authMiddleware = require('../middlewares/Auth.middleware');
const upload = require('../middlewares/upload');

const router = Router();


router.post("/lawyer", lawyersController.addLawyers);
router.post("/login", lawyersController.login);
router.get("/", lawyersController.getLawyers);
router.get("/services/:id", lawyersController.getLawyerByServices);
router.patch("/edit", authMiddleware, lawyersController.editLawyers);
router.delete("/:id", lawyersController.deleteLawyers);
router.patch('/updateImg', authMiddleware, upload.single('img'), lawyersController.updateImg);
router.get('/profile', authMiddleware, lawyersController.getOneLawyer);
router.patch('/add', authMiddleware, lawyersController.addServiceInSummary)
router.patch('/service/:id/delete/', authMiddleware, lawyersController.deleteServInSummary)

module.exports = router;