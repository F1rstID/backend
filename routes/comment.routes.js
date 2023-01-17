const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/:qId', authMiddleware, commentController.createComment); //댓글 생성 router
router.get('/:qId', authMiddleware, commentController.getAllComments); //댓글 조회 router
router.put('/:cId', authMiddleware, commentController.updateComment); //댓글 수정 router
router.delete('/:cId', authMiddleware, commentController.deleteComment); //댓글 삭제 router
router.put('/like/:cId', authMiddleware, commentController.commentLikeEvent); //댓글 좋아요 router

module.exports = router;
