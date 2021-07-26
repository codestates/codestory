const { TokenExpiredError } = require('jsonwebtoken');
const db = require('../models');
const {getKakaoToken,getGoogleToken,sendAccessToken,isAuthorizedOauth} = require('./OauthToken');


module.exports = {
  oauthLogin: async(req,res) => {
    try {
      let kakaoData= await getKakaoToken(req);
      let googleData= await getGoogleToken(req);
     
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
  oauthAuthorization: async(req,res)=>{
    try{
      const isAuthorization=await isAuthorizedOauth(req)
      console.log(isAuthorization.data);
      if(isAuthorization){
        res.status(200).send({"message":"ok"})
      }else{
        res.status(400).send({"message":"invalid Token"});
      }
    }
    catch(error){
      console.log(error);
      res.status(500).send({message: 'Sorry Can\'t procss your request'})
    }
  }
};
