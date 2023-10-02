const eventController = require('../controllers/eventController')


const Router = require('express')
const router = new Router()

router.post('/', eventController.create)

router.get('/:id', eventController.getOne)
router.get('/', eventController.getAll)

router.put('/:id', eventController.update)
router.delete('/:id', eventController.delete)

module.exports = router;