const CommentRepository = require('../repositories/comment.repository');
const { Comment, Quiz, Member, CommentLike } = require('../models');
const { NotFound, Forbidden } = require('../helper/http.exception.helper');

class CommentService {
  commentRepository = new CommentRepository(Comment, Quiz, Member, CommentLike);

  createComment = async (mId, qId, comment) => {
    return await this.commentRepository.createComment(mId, qId, comment);
  };

  getAllComments = async (qId) => {
    const allComments = await this.commentRepository.getAllComments(qId);

    return allComments;
  };

  updateComment = async (cId, comment, mId) => {
    const commentData = await this.commentRepository.findComment(cId);

    if (!commentData) throw new NotFound('');

    if (mId !== commentData.mId) throw new Forbidden('');

    const updateCommentData = await this.commentRepository.updateComment(
      cId,
      comment
    );

    if (updateCommentData < 1) {
      throw new NotFound('댓글이 정상적으로 수정되지 않았습니다.');
    }
  };

  deleteComment = async (cId, mId) => {
    const commentData = await this.commentRepository.findComment(cId);

    if (!commentData) throw new NotFound('');

    if (mId !== commentData.mId) throw new Forbidden('');

    const deleteCommentData = await this.commentRepository.deleteComment(cId);

    if (deleteCommentData < 1) {
      throw new NotFound('댓글이 정상적으로 삭제되지 않았습니다.');
    }
  };

  commentLikeEvent = async (cId, mId, commentLikeStatus) => {
    const cLike = await this.commentRepository.findCommentLike(cId, mId);

    if (cLike) {
      if (cLike.commentLikeStatus === commentLikeStatus) {
        return await this.commentRepository.delteCommentLike(cLike.cLId);
      }

      return await this.commentRepository.updateCommentLike(
        cLike.cLId,
        commentLikeStatus
      );
    }

    return await this.commentRepository.createCommentLike(
      cId,
      mId,
      commentLikeStatus
    );
  };
}

module.exports = CommentService;
