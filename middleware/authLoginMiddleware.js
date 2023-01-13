require('dotenv').config();

module.exports = (req, res, next) => {
    try {

      const accessToken = req.headers.accesstoken;
      if (accessToken) {
        return res.status(403).send({
          errorMessage: '이미 로그인이 되어있습니다.',
        });
      }
  
      next();
    } catch (error) {
      console.trace(error);
      return res.status(400).send({
        errorMessage: '잘못된 접근입니다.',
      });
    }
  };