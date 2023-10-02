const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const organizerRouter = require('./organizerRouter');
const lessonRouter = require('./lessonRouter');
const internshipRouter = require('./internshipRouter');
const eventRouter = require('./eventRouter');
const adRouter = require('./adRouter');

router.use('/user', userRouter);
router.use('/organizer', organizerRouter);
router.use('/lesson', lessonRouter);
router.use('/internship', internshipRouter);
router.use('/event', eventRouter);
router.use('/ad', adRouter);

module.exports = router;