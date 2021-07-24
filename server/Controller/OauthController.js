const db = require('../models');
const {getKakaoToken,getGoogleToken} = require('./OauthToken');


module.exports = {
  oauthLogin: async(req,res) => {
    try {
      console.log(req.body);
      res.status(200).json({"oauthAccessToken":"잘 받았다."})
        // console.log(req.body);   
        // let oauthAccessToken=await getKakaoToken(req);
        // console.log('oauthAccessToken',oauthAccessToken);
        // if(oauthAccessToken){
        //   res.status(200).json({"oauthAccessToken":oauthAccessToken})
        // }else{
        //   oauthAccessToken=getGoogleToken(req);
        //   if(oauthAccessToken){
        //     res.status(200).json({"oauthAccessToken":oauthAccessToken})
        //   }else{
        //     res.status(400).json({"message":"Bad request"})
        //   }
        // }
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};
