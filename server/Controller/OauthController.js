const { TokenExpiredError } = require('jsonwebtoken');
const db = require('../models');
const {getKakaoToken,getGoogleToken} = require('./OauthToken');


module.exports = {
  oauthLogin: async(req,res) => {
    try {
        let data= await getKakaoToken(req);
        let oauthAccessToken, oauthRefreshToken;
 
        if(data){
          oauthAccessToken=data.access_token;
          oauthRefreshToken=data.refresh_token;
          res.status(200).json({"oauthAccessToken":oauthAccessToken, "oauthRefreshToken":oauthRefreshToken});
        }else{
          data = await getGoogleToken(req);
          if(data){
            oauthAccessToken=data.access_token;
            oauthRefreshToken=data.refresh_token;
            res.status(200).json({"oauthAccessToken":oauthAccessToken, "oauthRefreshToken":oauthRefreshToken});
          }else{
            res.status(400).json({"message":"invalid Authorization Code"})
          }
        }
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};
