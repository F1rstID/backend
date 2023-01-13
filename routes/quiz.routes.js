const express = require('express');
const router = express.Router();
const QuizzesController = require('../controllers/quizzes.controller');
const quizzesController = new QuizzesController();

router.post('/', quizzesController.createQuiz);
router.get('/', quizzesController.getAllQuiz);
router.get('/:qId', quizzesController.getQuiz);
// router.put('/:qId', quizzesController.updateQuiz);
// router.delete('/:qId', quizzesController.deleteQuiz);

module.exports = router;
