const jwt = require('jsonwebtoken');
const db = require('../models');
module.exports = {
  signIn: async (req, res) => {
    try {
      const userInfo = await db.users.findOne({
        where: { userId: req.body.username, password: req.body.password }
      });
      if (!userInfo) {
        res.status(400).send({ message: 'badrequest' });
      }
      else {
        delete userInfo.dataValues.password;
        const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, { expiresIn: '1 day' });
        res.cookie('jwtAccessToken', accessToken, { sameSite: 'none', secure: true, httpOnly: true });
        res.send({ message: 'ok' });
      }
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};