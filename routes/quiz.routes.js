const express = require('express');
const router = express.Router();
const QuizzesController = require('../controllers/quizzes.controller');
const quizzesController = new QuizzesController();
const tokenValidateMiddleware = require('../middleware/token-validate-middleware');

router.post('/', tokenValidateMiddleware, quizzesController.createQuiz);
router.get('/', quizzesController.getAllQuiz);
router.get('/:quizId', tokenValidateMiddleware, quizzesController.getQuiz);
router.put('/:quizId', tokenValidateMiddleware, quizzesController.updateQuiz);
router.delete('/:quizId', tokenValidateMiddleware, quizzesController.deleteQuiz);
router.post('/:quizId/answer', tokenValidateMiddleware, quizzesController.submitAnswer)

router.put('/like/:quizId', tokenValidateMiddleware, quizzesController.likeEvent);

module.exports = router;
