require('dotenv').config()
const { BadRequestError, Unauthorized } = require('../helper/http.exception.helper')
const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../models')

function verifyToken(accessToken) {
  try {
    return jwt.verify(accessToken, process.env.SECRETKEY)
  } catch {
    return false
  }
}

module.exports = async (req, res, next) => {
  const accessToken = req.header('accessToken')
  console.log(accessToken)
  const decodedAccessToken = jwt.decode(accessToken)
  console.log(decodedAccessToken)
  //* Client 에서 accessToken 과 함께. API 요청이 들어옴.
  //* token이 들어오지 않을경우.
  //* 에러처리.

  if (!accessToken) throw new BadRequestError('')
  //* token이 들어온경우.
  //* token을 검증 해서 분기처리를 해줘야함.
  const validateAccessToken = verifyToken(accessToken)

  if (validateAccessToken) {
    //* 분기 1. token의 검증에 성공했을경우.
    //* next()를 이용하여 API 비지니스 로직으로 이동.
    //* 분기 1 끝.
    res.locals.mId = decodedAccessToken.mId
    next()
    return
  }
  //* 분기 2. token의 검증에 실패 했을경우.


  //* token을 decode 하여 memberId를 받아옴.


  //* memberId를 이용하여 데이터 베이스의 token 테이블에서 refreshToken이 존재하는지 확인함.
  const findRefreshToken = await RefreshToken.findOne({ where: { mId: decodedAccessToken.mId } })
  const refreshToken = findRefreshToken ? findRefreshToken.refreshToken : false

  //* 변수를 만들어서 refreshToken이 존재할 경우에 refreshToken을 담아두고 존재하지 않을경우 false를 담아줌.
  if (verifyToken(refreshToken)) {
    const newAccessToken = jwt.sign({ mId: decodedAccessToken.mId }, process.env.SECRETKEY, { expiresIn: '1d' })
    res.header('accessToken', newAccessToken)
    res.locals.mId = decodedAccessToken.mId
    next()
    return
  }

  throw new Unauthorized('토큰이 만료었습니다.')
};

//* 분기 2-1. refreshToken을 담은 변수의 검증에 성공했을경우.
//* 새로운 accessToken을 발급해줌.
//* res 에 accessTOken을 넣어줌.
// 분기 2-1 끝
//* token의 검증에 실패했고 , refreshToken의 검증에도 실패한 경우
// 이상한놈일세.
