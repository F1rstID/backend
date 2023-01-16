require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Member } = require('../models');
const { InvalidParamsError } = require('../helper/http.exception.helper');

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken || !refreshToken) {
      throw new InvalidParamsError('로그인 후 사용해주세요.');
    }

    let accessVerified = null;
    let refreshVerified = null;

    try {
      accessVerified = jwt.verify(accessToken, process.env.SECRETKEY);
    } catch (error) {
      accessVerified = null;
    }
    try {
      refreshVerified = jwt.verify(refreshToken, process.env.SECRETKEY);
    } catch (error) {
      refreshVerified = null;
    }

    try {
      // 1.access토큰, refresh토큰 모두 사용 불가
      if (!accessVerified && !refreshVerified) {
        throw new InvalidParamsError('로그인 기한이 만료되었습니다.');
      }
      // 2.access토큰은 만료되었지만 refresh토큰이 존재한다면 accessToken 발급
      if (!accessVerified && refreshVerified) {
        const existMember = await Member.findOne({
          where: { refreshToken: refreshToken },
        });

        if (!existMember) {
          throw new InvalidParamsError('로그인 기한이 만료되었습니다.');
        }

        // accessToken 발급
        const mId = existMember.mId;

        const newAccessToken = jwt.sign({ mId }, process.env.SECRETKEY, {
          expiresIn: '1d',
        });
        console.log(newAccessToken, 'newAccessToken 확인');
        res.cookies('accesToken', newAccessToken);

        return res.status(201).json({
          accessToken: newAccessToken,
          refreshToken: refreshToken,
          msg: 'acceess 토큰이 재발급 되었습니다.',
        });
      }

      // 3.access토큰은 있지만, refresh토큰 사용 불가하다면 refreshToken 발급
      if (accessVerified && !refreshVerified) {
        const { mId } = accessVerified;

        const existMember = await Member.findOne({ where: { mId } });
        if (!existMember) {
          throw new InvalidParamsError(401, '로그인 기한이 만료되었습니다.');
        }

        // refreshToken 발급
        const newRefreshToken = jwt.sign({ mId }, process.env.SECRETKEY, {
          expiresIn: '21d',
        });
        console.log(newRefreshToken, 'newRefreshToken 확인');

        await Member.update(
          { refreshToken: newRefreshToken },
          { where: { mId } }
        );
        res.cookies('refreshToken', newRefreshToken);

        return res.status(201).json({
          accessToken: accessToken,
          refreshToken: newRefreshToken,
          msg: 'refresh 토큰이 재발급 되었습니다.',
        });
      }

      if (accessVerified && refreshVerified) {
        const { mId } = accessVerified;
        Member.findOne({
          where: { mId },
          attributes: ['mId', 'memberId'],
        }).then((member) => {
          res.locals.member = member;
          next();
        });
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
