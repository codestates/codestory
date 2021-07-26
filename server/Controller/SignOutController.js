const {isAuthorizedJwt,sendAccessToken} = require('./JsonToken');
const {isAuthorizedOauth} = require('./OauthToken.js');

module.exports = {
  signOut: async (req, res) => {
    try{
      const jwt=await isAuthorizedJwt(req);
      const oauth=await isAuthorizedOauth(req);
      console.log(jwt,oauth);
      if(jwt || oauth){
        sendAccessToken(req,'invalid Token');
      }else{
        res.status(400).json({"message":"InvalidToken"})
      }
    }
    catch(error){
      res.status(500).send({ message: 'Sorry Can\'t process your request' })
    }
  }
}