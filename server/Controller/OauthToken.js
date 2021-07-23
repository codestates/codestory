const dotenv=require('dotenv')
const axios=require('axios');
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

dotenv.config();

module.exports = {
  getKakaoToken: async (req, res) => {
    
    // axios({
    //   method: 'post',
    //   url: 'https://kauth.kakao.com/oauth/token',
    //   headers: {
    //     accept: 'application/json',
    //   },
    //   data: {
    //     client_id: clientID,
    //     client_secret: clientSecret,
    //     code: req.body.authorizationCode
    //   }
    // }).then((response) => {
    //   accessToken = response.data.access_token;
    //   res.status(200).json({ accessToken: accessToken })
  
    // }).catch(e => {
    //   res.status(404)
    // })
      
    return res.status(200).send('i"m oauth');
  }
};

  