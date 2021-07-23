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
      try {
        return verify(jwt, process.env.ACCESS_SECRET);
<<<<<<< HEAD
      } catch (err) {
        return null
=======
      } catch {
        return null;
>>>>>>> 1ca8ca3233e20d4f7afeb9584cfb9d1918f1d0ba
      }
    }
  }
};