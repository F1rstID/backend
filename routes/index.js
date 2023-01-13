const express = require('express');
const router = express.Router();
const quizRouter = require('./quiz.routes');
const commentRouter = require('./comment.routes');

router.use('/quiz', quizRouter);
router.use('/comment', commentRouter);

module.exports = router;
