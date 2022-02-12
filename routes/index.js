const { Router } = require("express");

const router = Router();


router.use("/categories", require("./categories.route"));
router.use("/users", require("./users.route"));
router.use('/lawyers', require('./lawyers.route'))
router.use('/services', require('./services.route'))


module.exports = router;
