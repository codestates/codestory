const dotenv=require('dotenv')
const axios=require('axios');
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

dotenv.config();

module.exports = {
  getKakaoToken: async (req) => {
    
    axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        accept: "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        grant_type: 'authorization_code',
        client_id: clientID,
        client_secret: clientSecret,
        rediret_uri : 'http://localhost:3000/gamestart',
        code: req.body.authorizationCode
      }
    }).then((response) => {
      return response;
    }).catch(e => {
      return null
    })
  },
  getGoogleToken: async (req) => {
    
    axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        accept: "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        grant_type: 'authorization_code',
        client_id: clientID,
        client_secret: clientSecret,
        rediret_uri : 'http://localhost:3000/gamestart',
        code: req.body.authorizationCode
      }
    }).then((response) => {
      return response;
    }).catch(e => {
      return null
    })
  }
};

  