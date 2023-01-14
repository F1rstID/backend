const express = require('express');
const router = express.Router();

const quizRouter = require('./quiz.routes');
const membersRouter = require('./members.routes')

router.use('/quiz', quizRouter);
router.use('/members' , membersRouter);

module.exports = router;
