const Joi = require('joi');
const QuizzesService = require('../services/quizzes.service');

class QuizzesController {
  quizzesService = new QuizzesService();

  createQuiz = async (req, res) => {
    //* 토큰 검증 구현후 memberIndex 파라미터 삭제하기.
    const { memberIndex, title, content, answer } = req.body;
    console.log(memberIndex, title, content, answer);
    const quizzesData = this.quizzesService.createQuiz(
      memberIndex,
      title,
      content,
      answer
    );

    res.send(quizzesData);
  };
}

module.exports = QuizzesController;
