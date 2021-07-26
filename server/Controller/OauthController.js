const { TokenExpiredError } = require('jsonwebtoken');
const db = require('../models');
const {getKakaoToken,getGoogleToken,sendAccessToken} = require('./OauthToken');


module.exports = {
  oauthLogin: async(req,res) => {
    try {
      let kakaoData= await getKakaoToken(req);
      let googleData= await getGoogleToken(req);
      console.log('oauthToken 작동')
      if(kakaoData){
        let oauthAccessToken=kakaoData.access_token;
        sendAccessToken(res,'kakao',oauthAccessToken)
      }else if(googleData){
        let oauthAccessToken=googleData.access_token;
        sendAccessToken(res,'google',oauthAccessToken);
      }else{
        res.status(400).json({"message":"invalid Authorization Code"})
      }
    }
    catch (error) {
      res.status(500).send({" message": "Sorry Can\'t process your request" });
      throw error;
    }
  },
};
