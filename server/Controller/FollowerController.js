const { isAuthorizedJwt } = require('./JsonToken.js');
const db = require('../models');
module.exports = {
  follow: async (req, res) => {
    try {
      const jwt = isAuthorizedJwt(req);
      if (jwt) {
        const follower = await db.users.findOne({ where: { userId: jwt.userId } });
        const followed = await db.users.findOne({ where: { userId: req.body.username } });
        await db.follower_followeds.create({
          followerId: follower.dataValues.id,
          followedId: followed.dataValues.id
        });
        res.send({ result: true });
      }
      else {
        res.status(400).send({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).send({ message : 'Sorry Can\'t process your request' });
      throw error;
    }
  },
  unFollow: async (req, res) => {
    try {
      const jwt = isAuthorizedJwt(req);
      if (jwt) {
        const followed = await db.users.findOne({ where: { userId: req.body.username } });
        await db.follower_followeds.destroy({ where: {
          followerId: jwt.id,
          followedId: followed.dataValues.id
        } });
        res.send({ message: 'ok' });
      }
      else {
        res.status(400).send({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).send({ message : 'Sorry Can\'t process your request' });
      throw error;
    }
  },
  sendFollowingList: async (req, res) => {
    //sendFollowingList 함수를 채워주세요.
    return res.status(200).send('/sendFollowingList 라우팅완료');
  },
};