const express = require('express');
const router = express.Router();
const MembersController = require('../controllers/members.controller');
const authLoginMiddleware = require('../middleware/authLoginMiddleware');
const authMiddleware = require('../middleware/auth-middleware');
const membersController = new MembersController();

// member 가입
router.post('/join', authLoginMiddleware, membersController.memberJoin);

// memeber 가입 아이디 중복 체크
router.post('/join/check/Id', authLoginMiddleware, membersController.duplication);

// member 로그인
router.post('/login', authLoginMiddleware, membersController.memberLogin);

// member 이미 인증된 유저
router.get('/confirm', authMiddleware, membersController.memberConfirm);


module.exports = router;
