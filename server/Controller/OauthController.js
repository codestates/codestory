const db = require('../models');
const {getKaKaoToken,getGoogleToken} = require('./OauthToken');


module.exports = {
  oauthLogin: async(req,res) => {
    try {
        
        res.status(200).json({"oauthAccessToken":"hi new token"})
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};
