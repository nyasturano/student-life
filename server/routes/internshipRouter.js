const internshipController = require('../controllers/internshipController')


const Router = require('express')
const router = new Router()

router.post('/', internshipController.create)

router.get('/:id', internshipController.getOne)
router.get('/', internshipController.getAll)

router.put('/:id', internshipController.update)
router.delete('/:id', internshipController.delete)

module.exports = router;