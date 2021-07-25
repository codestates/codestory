const {isAuthorizedJwt} = require('./JsonToken');

module.exports = {
  signOut: async (req, res) => {
    try{
      if(isAuthorizedJwt(req)){
        res.cookie("jwtAccessToken","invalid Token").status(200).json({"message":"ok"});
      }else{
        res.status(400).json({"message":"InvalidToken"})
      }
    }
    catch(error){
      res.status(500).send({ message: 'Sorry Can\'t process your request' })
    }
  }
}