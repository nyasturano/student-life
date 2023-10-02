const lessonController = require('../controllers/lessonController')


const Router = require('express')
const router = new Router()

router.post('/', lessonController.create)

router.get('/:id', lessonController.getOne)
router.get('/', lessonController.getAll)

router.put('/:id', lessonController.update)
router.delete('/:id', lessonController.delete)

module.exports = router;