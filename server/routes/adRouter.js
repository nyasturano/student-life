const adController = require('../controllers/adController')


const Router = require('express')
const router = new Router()

router.post('/', adController.create)
router.post('/:id/addImage', adController.addImage)

router.get('/:id', adController.getOne)
router.get('/', adController.getAll)

router.put('/:id', adController.update)
router.delete('/:id', adController.delete)

module.exports = router;