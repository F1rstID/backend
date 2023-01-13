class CommentRepository {
  //* 의존성 주입
  constructor(CommentsModel, QuizzesModel, MembersModel, CommentLikesModel, CommentDislikesModel) {
    //* Model
    this.commentsModel = CommentsModel;
    this.quizzesModel = QuizzesModel;
    this.membersModel = MembersModel;
    this.commentLikesModel = CommentLikesModel;
    this.commentDislikesModel = CommentDislikesModel;
  }

  //댓글 DB에 생성
  createComment = async (mId, qId, nickname, comment) => {

      const createCommentData = await this.commentsModel.create(
      {mId, qId, nickname, comment},
      {where : {qId}}
    )

    return createCommentData;
  };

  getAllComments = async (qId) => {

    const allComments = await this.commentsModel.findAll({qId});

    return allComments;
  };

  updateComment = async (cId, comment) => {

    const updateCommentData = await this.commentsModel.update(
      {comment},
      {where : {cId}}
    );

    return updateCommentData;
    
  };

  deleteComment = async (cId) => {

    const deleteCommentData = await this.commentsModel.destroy(
      {where : {cId}}
    );

    return deleteCommentData;
  };


}

module.exports = CommentRepository