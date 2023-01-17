const express = require('express');
const router = express.Router();
const tokenValidateMiddleware = require('../middleware/token-validate-middleware');

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/:qId', tokenValidateMiddleware, commentController.createComment); //댓글 생성 router
router.get('/:qId', tokenValidateMiddleware, commentController.getAllComments); //댓글 조회 router
router.put('/:cId', tokenValidateMiddleware, commentController.updateComment); //댓글 수정 router
router.delete(
  '/:cId',
  tokenValidateMiddleware,
  commentController.deleteComment
); //댓글 삭제 router
router.put(
  '/like/:cId',
  tokenValidateMiddleware,
  commentController.commentLikeEvent
); //댓글 좋아요 router

module.exports = router;
