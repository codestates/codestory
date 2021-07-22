require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "400s" });
  },
  sendAccessToken: (res, accessToken) => {
    // TODO: JWT 토큰을 쿠키로 전달합니다.
    res.cookie('jwtAccessToken',accessToken).status(200).json({message: "ok" });
  },
  isAuthorizedJwt: (req) => {
    // TODO: JWT 토큰 정보를 받아서 검증합니다.
    // HINT: jsonwebtoken 라이브러리의 verify 함수를 사용하여 decode된 payload를 리턴하세요. (공식 문서의 Synchronous한 방법을 사용합니다)
    if(req.cookies){
      const jwt = req.cookies.jwtAccessToken;
      if (!jwt) {
        return null;
      }
      try {
        return verify(jwt, process.env.ACCESS_SECRET);
      } catch (err) {
        return res.status(500).json({"message":"Sorry Can't process your request"});
      }
    }
  }
};