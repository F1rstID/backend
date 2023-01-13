// const {memberIdex} =require('../middleware') //미들웨어 가져오기
require('express-async-errors')
const CommentService = require('../services/comment.service');

class CommentController {
  commentService = new CommentService();

  createComment = async (req, res, next) => {

    try{

    const {comment} = req.body;
    const {qId} = req.params;


    // const {mId, nickname} = res.locals.user;
    const mId = 1; //임시 유저 ID
    const nickname = "비굴이"; //임시 유저 닉네임


   
    const createdComment = await this.commentService.createComment(mId, qId, nickname, comment);



    res.status(createdComment.status || 500).json(createdComment.message);
    return;
  } catch (err) {
    console.log(err)
  }
  
  }



}

module.exports = CommentController;