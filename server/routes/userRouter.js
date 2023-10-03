const userController = require('../controllers/userController')


const Router = require('express')
const router = new Router()

router.post('/login', userController.login)
router.get('/:id', userController.getOne)
router.get('/', userController.getAll)

router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

module.exports = router;