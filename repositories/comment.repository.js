const { sequelize } = require('../models');

class CommentRepository {
  //* 의존성 주입
  constructor(CommentsModel, QuizzesModel, MembersModel, CommentLikesModel) {
    //* Model
    this.commentsModel = CommentsModel;
    this.quizzesModel = QuizzesModel;
    this.membersModel = MembersModel;
    this.commentLikesModel = CommentLikesModel;
  }

  //댓글 DB에 생성
  createComment = async (mId, qId, comment) => {
    const createCommentData = await this.commentsModel.create(
      { mId, qId, comment },
      { where: { qId } }
    );

    return createCommentData;
  };

  getAllComments = async (qId) => {
    try {
      const [commentData, metaData] = await sequelize.query(
        `select Comments.qId, Comments.cId, Members.nickname, Comments.comment, 
        count(case when commentLikeStatus = 1 then 1 end) as 'likes',
        count(case when commentLikeStatus = 0 then 1 end) as 'dislikes'
        from Comments
        left join Members
        on Comments.mId = Members.mId
        left join CommentLikes
        on Comments.cId = CommentLikes.cId
        `
      );
      console.log(commentData);
      return commentData;
    } catch (err) {
      console.log(err);
    }
  };

  updateComment = async (cId, comment) => {
    const updateCommentData = await this.commentsModel.update(
      { comment },
      { where: { cId } }
    );

    return updateCommentData;
  };

  deleteComment = async (cId) => {
    const deleteCommentData = await this.commentsModel.destroy({
      where: { cId },
    });

    return deleteCommentData;
  };

  findCommentLike = async (cId, mId) => {
    return await this.commentLikesModel.findOne({ where: { cId, mId } });
  };

  delteCommentLike = async (cLId) => {
    return await this.commentLikesModel.destroy({ where: { cLId } });
  };

  updateCommentLike = async (cLId, commentLikeStatus) => {
    return await this.commentLikesModel.update(
      { commentLikeStatus },
      { where: { cLId } }
    );
  };

  createCommentLike = async (cId, mId, commentLikeStatus) => {
    const data = await this.commentLikesModel.create({
      cId,
      mId,
      commentLikeStatus,
    });

    return data;
  };
}

module.exports = CommentRepository;
