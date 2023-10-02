const organizerController = require('../controllers/organizerController')


const Router = require('express')
const router = new Router()

router.post('/', organizerController.create)

router.get('/:id', organizerController.getOne)
router.get('/', organizerController.getAll)

router.put('/:id', organizerController.update)
router.delete('/:id', organizerController.delete)

module.exports = router;