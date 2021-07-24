require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '3600s' });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('jwtAccessToken',accessToken).status(200).json({message: 'ok' });
  },
  isAuthorizedJwt: (req) => {
    if(req.cookies){
      const jwt = req.cookies.jwtAccessToken;
      if (!jwt) {
        return null;
      }
      const token = jwt.split(" ")[1];
      try {
        return verify(token, process.env.ACCESS_SECRET);
      } catch {
        return null;
      }
    }
  }
};