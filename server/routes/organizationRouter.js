const organizationController = require('../controllers/organizationController')


const Router = require('express')
const router = new Router()

router.post('/', organizationController.create)

router.get('/:id', organizationController.getOne)
router.get('/', organizationController.getAll)

router.put('/:id', organizationController.update)
router.delete('/:id', organizationController.delete)

module.exports = router;