const MembersService = require('../services/members.service');
const { InvalidParamsError } = require('../helper/http.exception.helper');

const joi = require('../helper/joiSchema.js');


class MembersController {
    constructor() {
      this.membersService = new MembersService();
    }
    join = async (req, res, next) => {
        try {
          const result = joi.memberSchema.validate(req.body);
          
    
          if (result.error) {
            throw new InvalidParamsError('형식에 맞게 모두 입력해주세요');
          }
          const { memberId, password, confirm } = result.value;
          console.log(memberId, password, confirm)
          const createMember = await this.membersService.createMember(
            memberId,
            password,
            confirm
          );
    
          res.status(201).json({
            msg: '회원가입에 성공하였습니다.',
          });
        } catch (error) {
          next(error);
        }
      };
      
      login = async (req, res, next) => {
        try {
          const { memberId, password } = req.body;
    
          const member = await this.membersService.loginMember(memberId, password);
          
          res.cookie('accessToken', member[1]); // Access Token을 Cookie에 전달한다.
          res.cookie('refreshToken', member[2]);
          res.status(200).json({
            memberId: member[0].memberId,
            mId: member[0].mId,
            accessToken: member[1],
            refreshToken: member[0].refreshToken,
            msg: '로그인에 성공하였습니다.',
          });
        } catch (error) {
          next(error);
        }
      };

      confirmMember = async (req, res, next) => {
        try {
          const { mId, memberId } = res.locals.member;
          const { accessToken  } = res.locals;
    
          const existMember = await this.membersService.checkMember(mId);
            
          if (existMember.refreshToken === refreshToken){
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