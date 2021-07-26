const dotenv=require('dotenv')
const axios=require('axios');
const qs=require('querystring');
const { response } = require('express');
const kakaoClientId = process.env.KAKAO_CLIENTID;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENTID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

dotenv.config();

module.exports = {
  getKakaoToken: async (req) => {
    const response=await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
      },
      data:qs.stringify({
        grant_type: 'authorization_code', 
        client_id: kakaoClientId,
        client_secret: kakaoClientSecret,
        redirect_uri : 'http://localhost:3000/gamestart',
        code: req.body.authorizationCode
      })
    })
    .then((res) => {
      return res.data;
    })
    .catch(err => {
      console.log('kakao get token error');
      return null;
    })
    return response;
  },
  getGoogleToken: async (req) => {
    const response=await axios({
      url: 'https://www.googleapis.com/oauth2/v4/token',
      method: 'post',
      data: qs.stringify({
        code: req.body.authorizationCode,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: 'http://localhost:3000/gamestart',
        grant_type: 'authorization_code',
      })
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) =>{
      console.log('google get token err');
      return null
    });
    return response;
  },
  sendAccessToken: (res, cookieName,accessToken) => {
    let oauthAccessToken=cookieName+' '+accessToken
    res.cookie('accessToken',oauthAccessToken,{ sameSite:'none',secure:true,httpOnly:true}).status(200).json({message: 'ok'});
  },
  isAuthorizedOauth: async (req) => {
    if(req.cookies){
      let oauthLocation=req.cookies.accessToken.split(' ')[0];
      let accessToken=req.cookies.accessToken.split(' ')[1];
      if(oauthLocation==='kakao'){
        const response=await axios({
          url :'https://kauth.kakao.com/v1/user/access_token_info',
          metohod : 'get',
          headers: { 
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            "Authorization": `Bearer ${accessToken}`
          }
        })
        .then(res =>{
          return res;
        })
        .catch((err)=>{
          console.log(err);
          return null;
        })
        return response;
      }else if(oauthLocation='google'){
        const response=await axios({
          url : 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
          method : 'get',
          headers: {
            "Authorization":`Bearer ${accessToken}`
          }
        })
        .then(res =>{
          return res;
        })
        .catch((err)=>{
          console.log(err);
          return null;
        })
        return response;
      }else{
        return null;
      }
    }
  }
};

  
