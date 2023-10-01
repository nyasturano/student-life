const newsController = require('../controllers/newsController')


const Router = require('express');
const router = new Router();

router.post('/', newsController.create);

router.get('/:id', newsController.getOne);
router.get('/', newsController.getAll);

router.put('/:id', newsController.update);
router.delete('/:id', newsController.delete);

module.exports = router;