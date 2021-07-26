const {isAuthorizedJwt,sendAccessToken} = require('./JsonToken');
const {isAuthorizedOauth} = require('./OauthToken.js');

module.exports = {
  signOut: async (req, res) => {
    console.log('signOut작동')
    try{
      const jwt=await isAuthorizedJwt(req);
      const oauth=await isAuthorizedOauth(req);
      console.log(jwt,oauth);
      if(jwt || oauth){
        res.cookie('accessToken','jwt invalidToken',{ sameSite: 'none', secure: true, httpOnly: true }).status(200).json({message: 'ok' });
      }else{
        res.status(400).json({"message":"InvalidToken"})
      }
    }
    catch(error){
      res.status(500).send({ message: 'Sorry Can\'t process your request' })
    }
  }
}