const {isAuthorizedJwt,generateAccessToken,sendAccessToken} = require('./JsonToken');

module.exports = {
  signOut: async (req, res) => {
    if(isAuthorizedJwt(req)){
      res.cookie("jwtAccessToken","invalid Token").status(200).json({"message":"ok"});
    }
  }
}