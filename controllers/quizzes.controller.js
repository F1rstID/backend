require('express-async-errors');
const Joi = require('joi');
const QuizzesService = require('../services/quizzes.service');
const { BadRequestError } = require('../helper/http.exception.helper');

const quizSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  answer: Joi.string().required(),
});

class QuizzesController {
  quizzesService = new QuizzesService();

  createQuiz = async (req, res) => {
    //* req.body의 타입이 createQuizSchema의 타입과 일치 하는지 검증한다.
    const resultSchema = quizSchema.validate(req.body);
    //* 검증에 실패 하였을 경우
    if (resultSchema.error) {
      //* 지정된 타입과 맞지 않는 타입 이므로 400(Bad Request)
      throw new BadRequestError('데이터 형식이 올바르지 않습니다.');
    }
    const mId = res.locals.mId;
    const { title, content, answer } = req.body;
    //* Quiz 게시글 작성.
    await this.quizzesService.createQuiz(mId, title, content, answer);

    //* Quiz 게시글 작성에 성공 하였으므로
    //* 201(Created)
    res.sendStatus(201);
  };

  getAllQuiz = async (req, res) => {
    //* 모든 게시글 조회.
    const quizzes = await this.quizzesService.getAllQuizzes();
    //* 성공시 200(OK)
    return res.status(200).json(quizzes);
  };

  getQuiz = async (req, res) => {
    //* 특정한 한개의 게시글 조회.
    const { quizId } = req.params;
    const { mId } = res.locals;
    const quiz = await this.quizzesService.getQuiz(quizId, mId);
    //* 성공시 200(OK)
    return res.status(200).json(quiz);
  };

  updateQuiz = async (req, res) => {
    const { quizId } = req.params;

    //* req.body의 타입이 quizSchema의 타입과 일치 하는지 검증한다.
    const resultSchema = quizSchema.validate(req.body);
    //* 검증에 실패 하였을 경우
    if (resultSchema.error) {
      //* 지정된 타입과 맞지 않는 타입 이므로 400(Bad Request)
      throw new BadRequestError('데이터 형식이 올바르지 않습니다.');
    }

    const { title, content, answer } = req.body;

    const { mId } = res.locals;

    await this.quizzesService.updateQuiz(quizId, mId, title, content, answer);

    //* 201(Created)
    res.sendStatus(201);
  };

  deleteQuiz = async (req, res) => {
    const { quizId } = req.params;

    const { mId } = res.locals;

    await this.quizzesService.deleteQuiz(quizId, mId);

    //* 201(Created)
    res.sendStatus(204);
  };

  likeEvent = async (req, res) => {
    const mId = res.locals.mId;
    const { quizId } = req.params;
    const { likeStatus } = req.body;

    //* 잘찍힘

    await this.quizzesService.likeEvent(quizId, mId, likeStatus);

    return res.sendStatus(201);
  };

  submitAnswer = async (req, res) => {
    const answerType = Joi.object({
      answer: Joi.string().required(),
    });
    const result = answerType.validate(req.body);
    const { answer } = req.body;
    const { quizId } = req.params;
    console.log(answer, quizId);
    if (result.error) throw new BadRequestError('');

    const correct = await this.quizzesService.submitAnswer(quizId, answer);

    return res.status(200).json({ correct });
  };
}

module.exports = QuizzesController;
