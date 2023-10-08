const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const organizationRouter = require('./organizationRouter');
const lessonRouter = require('./lessonRouter');
const internshipRouter = require('./internshipRouter');
const eventRouter = require('./eventRouter');
const adRouter = require('./adRouter');
const ownerRouter = require('./ownerRouter')

router.use('/user', userRouter);
router.use('/organization', organizationRouter);
router.use('/lesson', lessonRouter);
router.use('/internship', internshipRouter);
router.use('/event', eventRouter);
router.use('/ad', adRouter);
router.use('/owner', ownerRouter);

module.exports = router;