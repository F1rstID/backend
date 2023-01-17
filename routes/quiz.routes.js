const express = require('express');
const router = express.Router();
const QuizzesController = require('../controllers/quizzes.controller');
const quizzesController = new QuizzesController();
const tokenValidateMiddleware = require('../middleware/token-validate-middleware');

router.post('/', tokenValidateMiddleware, quizzesController.createQuiz);
router.get('/', quizzesController.getAllQuiz);
router.get('/:qId', tokenValidateMiddleware, quizzesController.getQuiz);
router.put('/:qId', tokenValidateMiddleware, quizzesController.updateQuiz);
router.delete('/:qId', tokenValidateMiddleware, quizzesController.deleteQuiz);

router.put('/like/:qId', tokenValidateMiddleware, quizzesController.likeEvent);

module.exports = router;
