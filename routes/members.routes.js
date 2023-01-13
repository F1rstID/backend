const express = require('express');
const router = express.Router();
const MembersController = require('../controllers/members.controller');
const membersController = new MembersController();

router.post('/join', authLoginMiddleware, membersController.join);
router.post('/login', authLoginMiddleware, membersController.login);
router.get('/confirm', authMiddleware, membersController.confirmMember);

module.exports = router;
