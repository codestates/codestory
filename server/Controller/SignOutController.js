const {isAuthorizedJwt,sendAccessToken} = require('./JsonToken');
const {isAuthorizedOauth} = require('./OauthToken.js');

module.exports = {
  signOut: async (req, res) => {
    try{
      const jwt=isAuthorizedJwt(req);
      const oauth=isAuthorizedOauth(req);
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