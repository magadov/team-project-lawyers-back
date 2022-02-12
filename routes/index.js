const { Router } = require("express");

const router = Router();

router.use('/lawyers', require('./lawyers.route'))
router.use('/services', require('./services.route'))

module.exports = router;
