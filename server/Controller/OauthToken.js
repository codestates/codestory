const dotenv=require('dotenv')
const axios=require('axios');
const qs=require('querystring')
const clientID = process.env.KAKAO_CLIENTID;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;

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
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri : 'http://localhost:3000/gamestart',
        code: req.body.authorizationCode
      })
    })
    .then((res) => {
      return res.data;
    })
    .catch(e => {
      console.log(e);
      return null;
    })

    return response;
  },
  getGoogleToken: async (req) => {
    const response=axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri : 'http://localhost:3000/gamestart',
        code: req.body.authorizationCode
      })
    })
    .then((res) => {
      return res.data;
    })
    .catch(e => {
      console.log(e);
      return null;
    })

    return response;
  }
};

  