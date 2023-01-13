const express = require('express');
const router = express.Router();
//미들웨어 추가하세용

const CommentControllers = require('../controllers/comment.controllers');
const commentControllers = new CommentControllers

router.post('/:quizIndex', commentControllers.createComment); //댓글 생성 router
// router.get('/:quizIndex', commentControllers.getAllComments); //댓글 조회 router
// router.put('/:commentIndex', commentControllers.updateComment); //댓글 수정 router
// router.delete('/:commentIndex', commentControllers.deleteComment); //댓글 삭제 router

module.exports = router