const dotenv=require('dotenv')
const axios=require('axios');
const qs=require('querystring')
const kakaoClientId = process.env.KAKAO_CLIENTID;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENTID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

dotenv.config();

module.exports = {
  getKakaoToken: async (req) => {
    const response=axios({
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
      console.log('kakao error');
      return null;
    })
    return response;
  },
  getGoogleToken: async (req) => {
    const response=axios({
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
      console.log('google err');
      return null
    });
    return response;
  }
};

  