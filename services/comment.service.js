const CommentRepository = require('../repositories/comment.repository');

const error = new Error();
error.status = 400;
const result = {};


class CommentService {

  commentRepository = new CommentRepository;
  
  createComment = async (mId, qId, nickname, comment) => {

    console.log(mId, qId, nickname, comment)

    try {

      if(!comment) {

        error.status =412;
        error.message = {errorMessage : "댓글을 작성해주세요."}
        throw error;

      }

      if(!qId) {

        error.status = 999;
        error.message = {errorMessage : "해당 퀴즈가 없습니다."}
        throw error;
      }

      const createCommentData = await this.commentRepository.createComment(mId, qId, nickname, comment);


      if (mId !== createCommentData.mId) {

        error.status = 999;
        error.message = {errorMessage : "작성자가 아닙니다."}
        throw error;
      }

      result.status = 201;
      result.message = {message : "댓글 작성에 성공했습니다."}
      return result

    } catch (error) {


      return error

    }
  }
}

module.exports = CommentService
