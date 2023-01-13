// const {memberIdex} =require('../middleware') //미들웨어 가져오기
require('express-async-errors')
const CommentService = require('../services/comment.service');
const { BadRequestError } = require('../helper/http.exception.helper');
const Joi = require('joi');

const commentSchema =  Joi.object({
  //* FIXME: 토큰 검증 구현후 mId 파라미터 삭제하기.
  mId: Joi.number(),
  qId: Joi.number(),
  nickname : Joi.string().required(),
  comment: Joi.string().required(),
});

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {
//* req.body의 타입이 commentSchema의 타입과 일치 하는지 검증한다.
    const resultSchema = commentSchema.validate(req.body);
    //* 검증에 실패 하였을 경우
    if (resultSchema.error) {
      //* 지정된 타입과 맞지 않는 타입 이므로 400(Bad Request)
      throw new BadRequestError('데이터 형식이 올바르지 않습니다.');
    }

    //* FIXME: 토큰 검증 구현후 mId 파라미터 삭제하기.
    const {mId, nickname, comment} = req.body;
    const {qId} = req.params;
    //* 댓글 작성.
    await this.commentService.createComment(mId, qId, nickname, comment);

   
    //* 201(Created)
    return res.sendStatus(201);
  };

  getAllComments = async (req, res, next) => {
    //댓글 조회
    const {qId} = req.params;
    const allComments = await this.commentService.getAllComments(qId);

    return res.status(200).json({allComments});
  };

  updateComment = async (req, res, next) => {
    //댓글 수정
    const {cId} = req.params;
    const {comment} = req.body;
    const updatedComment = await this.commentService.updateComment(cId, comment);

    return res.sendStatus(201);
  }



}

module.exports = CommentController;