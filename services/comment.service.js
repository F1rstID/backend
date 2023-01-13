const CommentRepository = require('../repositories/comment.repository');

const error = new Error();
const result = {};

class CommentService {

  commentRepository = new CommentRepository;
  
  createComment = async (comment, quizIndex, memberIndex, nickname) => {

    console.log(comment)
    console.log(quizIndex)
    console.log(memberIndex)
    console.log(nickname)

    try {

      if(!comment) {

        error.status =412;
        error.message = {errorMessage : "댓글을 작성해주세요."}
        throw error;

      }

      if(!quizIndex) {

        error.status = 999;
        error.message = {errorMessage : "해당 퀴즈가 없습니다."}
        throw error;
      }

      const createCommentData = await this.commentRepository.createComment(memberIndex, quizIndex, nickname, comment);

      if (memberIndex !== createCommentData.memberIndex) {

        error.status = 999;
        error.message = {errorMessage : "작성자가 아닙니다."}
        throw error;
      }

      result.status = 201;
      result.message = {message : "댓글 작성에 성공했습니다."}

    } catch (error) {

      return error

    }
  }
}

module.exports = CommentService
