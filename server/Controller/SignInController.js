const { generateAccessToken, sendAccessToken } = require('./JsonToken');
const db = require('../models');
module.exports = {
  signIn: async (req, res) => {
    try {
      console.log('signIN routing!');
      const userInfo = await db.users.findOne({
        where: { userId: req.body.username, password: req.body.password }
      });
      if (!userInfo) {
        res.status(400).send({ message: 'badrequest' });
      }
      else {
        delete userInfo.dataValues.password;
        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken);
      }
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};