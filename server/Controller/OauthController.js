const {getKakaoToken,getGoogleToken,sendAccessToken} = require('./OauthToken');


module.exports = {
  oauthLogin: async(req,res) => {
    try {
      const kakaoData= await getKakaoToken(req);
      const googleData= await getGoogleToken(req);
      if(kakaoData){
        const oauthAccessToken=kakaoData.access_token;
        sendAccessToken(res,'kakao',oauthAccessToken);
      }else if(googleData){
        const oauthAccessToken=googleData.access_token;
        sendAccessToken(res,'google',oauthAccessToken);
      }else{
        res.status(400).json({message:'invalid Authorization Code'});
      }
    }
    catch (error) {
      res.status(500).send({message: 'Sorry Can\'t process your request' });
      throw error;
    }
  },
};
