const {isAuthorizedJwt} = require('./JsonToken');
const {isAuthorizedOauth} = require('./OauthToken.js');

module.exports = {

  signOut: async (req, res) => {
    try{
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt || oauth) {
        res.cookie('accessToken', 'jwt invalidToken', { sameSite: 'none', secure: true, httpOnly: true }).status(200).json({ message: 'ok' });
      } else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
    }
  }
};
