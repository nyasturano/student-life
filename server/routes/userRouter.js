const userController = require('../controllers/userController')
const auth = require('../middlewares/authMiddleware')

const Router = require('express')
const router = new Router()

router.post('/login', userController.login)
router.get('/auth', auth, userController.auth)
router.get('/:id', userController.getOne)
router.get('/', userController.getAll)

router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

module.exports = router;