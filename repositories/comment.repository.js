const {Comment} = require('../models')

class CommentRepository {

  createComment = async (mId, qId, nickname, comment) => {

      const createCommentData = await Comment.create(
      {mId, qId, nickname, comment},
      {where : {qId}}
    )

    return createCommentData;
    
  }
}

module.exports = CommentRepository