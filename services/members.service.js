require('dotenv').config();
const MembersRepository = require('../repositories/members.repository')
const { ValidationError } = require('../helper/http.exception.helper');
const jwt = require('jsonwebtoken');


class MembersService {
  constructor() {
    this.membersRepository = new MembersRepository();
  }

  createMember = async (memberId, password, nickname) => {

    const findNickname = await this.membersRepository.findOneNickname(nickname);

    if (findNickname) throw new Error('이미 사용중인 닉네임입니다.');
      
    await this.membersRepository.createMember(memberId, password,nickname);
  };

  loginMember = async (memberId, password) => {
    const member = await this.membersRepository.findOneId(memberId,password);

    if (!member) {
      throw new ValidationError('아이디 또는 패스워드가 잘못되었습니다.');
    }

    const accessToken = jwt.sign(
      { memberId: member.memberId },
      process.env.SECRETKEY,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
      { memberId: member.memberId },
      process.env.SECRETKEY,
      { expiresIn: '21d' }
    );
    console.log(accessToken, 'access토큰 확인');
    console.log(refreshToken, 'refresh토큰 확인');

    await this.membersRepository.updateRefresh(refreshToken, member);

    return [member, accessToken, refreshToken];
  };

  duplication = async (memberId) => {
    const findId = await this.membersRepository.findOneId(memberId);
    if (findId) {
      throw new ValidationError('이미 사용중인 아이디입니다.');
    }
  };

  confirmMember = async (memberId) => {
    const existMember = await this.membersRepository.findOneMember(memberId);

    return existMember;
  };
}

module.exports = MembersService;