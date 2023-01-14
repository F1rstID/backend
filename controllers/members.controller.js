require('express-async-errors')
const MembersService = require('../services/members.service');
const { InvalidParamsError } = require('../helper/http.exception.helper');

const joi = require('../helper/joiSchema.js');

class MembersController {
  constructor() {
    this.membersService = new MembersService();
  }
  memberJoin = async (req, res, next) => {
    
    try {
      const result = joi.memberSchema.validate(req.body);
      // console.log(result.value)
      
      if (result.error) throw new InvalidParamsError('형식에 맞게 모두 입력해주세요');
      
      const { memberId, password, nickname } = result.value;
      console.log(memberId, password, nickname);
      const createMember = await this.membersService.createMember(
        memberId,
        password,
        nickname
      );

      res.status(201).json({ msg: '회원가입에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  memberLogin = async (req, res, next) => {
    try {
      const { memberId, password } = req.body;

      const member = await this.membersService.loginMember(memberId, password);

      res.cookie('accessToken', member[1]); // Access Token을 Cookie에 전달한다.
      res.cookie('refreshToken', member[2]);
      res.status(200).json({
        msg: '로그인에 성공하였습니다.',
      });
    } catch (error) {
      next(error);
    }
  };

  duplication = async (req, res, next) => {
    try {
      const { memberId } = req.body;
      const duplication = await this.membersService.duplication(memberId);

      res.status(200).json({ msg: '사용가능한 아이디 입니다.' });
    } catch (error) {
      next(error);
    }
  };

  memberConfirm = async (req, res, next) => {
    try {
      const { mId, memberId } = res.locals.member;
      const { accessToken } = res.locals;

      const existMember = await this.membersService.confirmMember(mId);

      if (existMember.refreshToken === refreshToken) {
        res.status(200).json({
          ok: true,
          msg: '로그인 유저 정보 확인',
          accessToken,
          refreshToken: existMember.refreshToken,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
module.exports = MembersController;
