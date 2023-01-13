const express = require('express');
const router = express.Router();
const quizRouter = require('./quiz.routes');

router.use('/quiz', quizRouter);

module.exports = router;
