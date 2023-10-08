const ownerController = require('../controllers/ownerController')
const checkRole = require('../middlewares/checkRoleMiddleware')


const Router = require('express')
const router = new Router()

router.post('/', ownerController.create)

router.get('/:id', ownerController.getOne)
router.get('/', ownerController.getAll)

router.put('/:id', ownerController.update)
router.delete('/:id', ownerController.delete)

module.exports = router;