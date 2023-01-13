const {Comment} = require('../models')

class CommentRepository {

  createComment = async (memberIndex, quizIndex, nickname, comment) => {

    const createCommentData = await Comment.create(
      {memberIndex, quizIndex, nickname, comment},
      {where : {quizIndex}}
    )

    return createCommentData;
  }
}

module.exports = CommentRepository