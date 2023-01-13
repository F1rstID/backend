const CommentRepository = require('../repositories/comment.repository');
const {Comment, Quiz, Member, CommentLike, CommentDislike} = require('../models');

class CommentService {

  commentRepository = new CommentRepository(
    Comment, 
    Quiz, 
    Member, 
    CommentLike, 
    CommentDislike 
  );
  
  createComment = async (mId, qId, nickname, comment) => {
    
      return  await this.commentRepository.createComment(mId, qId, nickname, comment);
  };

  getAllComments = async (qId) => {
    
    return await this.commentRepository.getAllComments(qId);
  };

  updateComment = async (cId, comment) => {

    return await this.commentRepository.updateComment(cId, comment);
  }
}

module.exports = CommentService
