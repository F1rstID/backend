// const {memberIdex} =require('../middleware') //미들웨어 가져오기
require('express-async-errors')
const CommentService = require('../services/comment.service');

class CommentControllers {
  commentService = new CommentService;

  createComment = async (req, res, next) => {

    const {comment} = req.body;
    const {quizIndex} = req.parmas;

    console.log(comment)

    // const {memberIndex, nickname} = res.locals.user;
    const memberIndex = 1; //임시 유저 ID
    const nickname = "비굴이"; //임시 유저 닉네임
   
    const createdComment = await this.commentService.createComment(memberIndex, quizIndex, nickname, comment);

    res.status(createdComment.status || 500).json(createdComment.result);
    return;
  
  }



}

module.exports = CommentControllers