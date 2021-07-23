const db = require('../models');
const {getKaKaoToken,getGoogleToken} = require('./OauthToken');


module.exports = {
  googleLogin: async (req, res) => {
    try {
        console.log(req.body);   
        const authorizationCode=req.body.authorizationCode;
        res.status(200).send("google login 라우팅")
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  },
  oauthLogin: async(req,res) => {
    try {
        console.log(req.body);   
        // getKaKatoToken(req)
        res.status(200).json({"oauthAccessToken":"hi new token"})
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};
