const { Router } = require("express");

const router = Router();

router.use("/categories", require("./categories.route"));
router.use("/users", require("./users.route"));

module.exports = router;
