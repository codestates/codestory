const { isAuthorizedJwt } = require('./JsonToken.js');
const db = require('../models');
module.exports = {
  follow: async (req, res) => {
    try {
      const jwt = isAuthorizedJwt(req);
      if (jwt) {
        const followed = await db.users.findOne({ where: { userId: req.body.username } });
        await db.follower_followeds.create({
          followerId: jwt.id,
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
    try {
      const jwt = isAuthorizedJwt(req);
      if (jwt) {
        const result = await db.follower_followeds.findAll({ where: { followerId: jwt.id }, order: [['id', 'DESC']] });
        const followingArr = [];
        for (let record of result) {
          const followed = await db.users.findOne({ where: { id: record.dataValues.followedId } });
          followingArr.push({
            username: followed.dataValues.userId,
            photourl: followed.dataValues.pictureurl
          });
        }
        res.send({ data: followingArr });
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
};