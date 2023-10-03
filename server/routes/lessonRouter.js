const lessonController = require('../controllers/lessonController')
const authMiddleware = require('../middlewares/authMiddleware')

const Router = require('express')
const router = new Router()

router.post('/', authMiddleware, lessonController.create)
router.post('/pull', authMiddleware, lessonController.pull)

router.get('/', authMiddleware, lessonController.getAll)
router.get('/share', authMiddleware, lessonController.share)

router.put('/:id', authMiddleware, lessonController.update)
router.delete('/:id', authMiddleware, lessonController.delete)

module.exports = router;