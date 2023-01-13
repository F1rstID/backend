require('dotenv').config();
const MembersRepository = require('../repositories/members.repository')
const { ValidationError } = require('../helper/http.exception.helper');
const jwt = require('jsonwebtoken');


class MembersService {
  constructor() {
    this.membersRepository = new MembersRepository();
  }

  createMember = async (memberId, password, confirm) => {
    if (password !== confirm) {
      throw new ValidationError('패스워드가 일치하지 않습니다.');
    }

    const findId = await this.membersRepository.findOneId(memberId);

    if (findId) {
      throw new ValidationError('이미 사용중인 아이디입니다.');
    }

    await this.membersRepository.createMember(memberId, password);
  };
  loginMember = async (memberId, password) => {
    const member = await this.membersRepository.findOneId(memberId);

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

  checkUser = async (userId) => {
    const existUser = await this.membersRepository.findOneUser(userId);

    return existUser;
  };
}

module.exports = MembersService;