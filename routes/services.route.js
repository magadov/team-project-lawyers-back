const {Router} = require('express')
const {servicesController} = require('../controllers/services.controller')
const authMiddleware = require('../models/middlewares/auth.middleware')

const router = Router();

router.post('/', authMiddleware, servicesController.addServices)
router.get('/', servicesController.getServices)
router.get('/categories/:id', servicesController.getServicesByCategories)
router.patch('/:id', servicesController.editServices)
router.delete('/:id',authMiddleware, servicesController.deleteServices)

module.exports = router;