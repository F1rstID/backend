require('express-async-errors');
const Joi = require('joi');
const QuizzesService = require('../services/quizzes.service');
const { BadRequestError } = require('../helper/http.exception.helper');

const quizSchema = Joi.object({
  //* FIXME: 토큰 검증 구현후 mId 파라미터 삭제하기.
  mId: Joi.number(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  answer: Joi.string().required(),
});

class QuizzesController {
  quizzesService = new QuizzesService();

  createQuiz = async (req, res) => {
    //* req.body의 타입이 quizSchema의 타입과 일치 하는지 검증한다.
    const resultSchema = quizSchema.validate(req.body);
    //* 검증에 실패 하였을 경우
    if (resultSchema.error) {
      //* 지정된 타입과 맞지 않는 타입 이므로 400(Bad Request)
      throw new BadRequestError('데이터 형식이 올바르지 않습니다.');
    }

    //* FIXME: 토큰 검증 구현후 mId 파라미터 삭제하기.
    const { mId, title, content, answer } = req.body;
    //* Quiz 게시글 작성.
    await this.quizzesService.createQuiz(mId, title, content, answer);

    //* Quiz 게시글 작성에 성공 하였으므로
    //* 201(Created)
    res.sendStatus(201);
  };

  getAllQuiz = async (req, res) => {
    //* 모든 게시글 조회.
    const quiz = await this.quizzesService.getAllQuiz();
    //* 성공시 200(OK)
    return res.status(200).json({ quiz });
  };
}

module.exports = QuizzesController;
