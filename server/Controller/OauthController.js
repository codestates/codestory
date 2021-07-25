const { TokenExpiredError } = require('jsonwebtoken');
const db = require('../models');
const {getKakaoToken,getGoogleToken} = require('./OauthToken');


module.exports = {
  oauthLogin: async(req,res) => {
    try {
      let kakaoData= await getKakaoToken(req);
      let googleData= await getGoogleToken(req);
      let data=kakaoData || googleData;
      console.log.apply(data);
      if(data){
        let oauthAccessToken=data.access_token;
        let oauthRefreshToken=data.refresh_token;
        res.status(200).json({"oauthAccessToken":oauthAccessToken, "oauthRefreshToken":oauthRefreshToken});
      }else{
        res.status(400).json({"message":"invalid Authorization Code"})
      }
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};
