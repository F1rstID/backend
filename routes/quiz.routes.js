const express = require('express');
const router = express.Router();
const QuizzesController = require('../controllers/quizzes.controller');
const quizzesController = new QuizzesController();

router.post('/', quizzesController.createQuiz);

module.exports = router;
