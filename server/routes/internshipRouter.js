const internshipController = require('../controllers/internshipController')
const checkRole = require('../middlewares/checkRoleMiddleware')


const Router = require('express')
const router = new Router()

// router.post('/', checkRole('ADMIN'), internshipController.create)
router.post('/', internshipController.create)

router.get('/:id', internshipController.getOne)
router.get('/', internshipController.getAll)

router.put('/:id', internshipController.update)
router.delete('/:id', internshipController.delete)

module.exports = router;