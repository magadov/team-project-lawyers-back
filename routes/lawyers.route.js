const { Router } = require("express");
const { lawyersController } = require("../controllers/lawyers.controller");

const router = Router();

router.post("/", lawyersController.addLawyers);
router.post("/lawyer", lawyersController.registerLawyer);
router.post("/login", lawyersController.login);
router.get("/", lawyersController.getLawyers);
router.get("/services/:id", lawyersController.getLawyerByServices);
router.patch("/:id", lawyersController.editLawyers);
router.delete("/:id", lawyersController.deleteLawyers);

module.exports = router;
