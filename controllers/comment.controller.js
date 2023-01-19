require('express-async-errors');
const CommentService = require('../services/comment.service');
const { BadRequestError } = require('../helper/http.exception.helper');
const Joi = require('joi');

const commentSchema = Joi.object({
  //* FIXME: 토큰 검증 구현후 mId 파라미터 삭제하기.
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

    const mId = res.locals.mId;
    const { comment } = req.body;
    const { qId } = req.params;
    //* 댓글 작성.
    await this.commentService.createComment(mId, qId, comment);

    return res.sendStatus(201);
  };

  getAllComments = async (req, res, next) => {
    //댓글 조회
    const { qId } = req.params;
    console.log(qId)
    const allComments = await this.commentService.getAllComments(qId);

    return res.status(200).json({ allComments });
  };

  updateComment = async (req, res, next) => {
    //댓글 수정
    const { cId } = req.params;
    const { comment } = req.body;
    const updatedComment = await this.commentService.updateComment(
      cId,
      comment
    );

    return res.sendStatus(201);
  };

  deleteComment = async (req, res, next) => {
    //댓글 삭제
    const { cId } = req.params;
    const deletedComment = await this.commentService.deleteComment(cId);

    return res.sendStatus(204);
  };

  commentLikeEvent = async (req, res, next) => {
    const mId = 1;

    const { cId } = req.params;
    const { commentLikeStatus } = req.body;

    await this.commentService.commentLikeEvent(cId, mId, commentLikeStatus);

    return res.sendStatus(201);
  };
}

module.exports = CommentController;
