const { isAuthorizedJwt } = require('./JsonToken');
const {isAuthorizedOauth} = require('./OauthToken.js');
const db = require('../models');

module.exports = {
  sendRanking: async (req, res) => {
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt || oauth) {
        const rankingArr = await db.users.findAll({ order: [['coin', 'DESC'], ['id', 'ASC']] });
        const followedArr = await db.follower_followeds.findAll({ where: { followerId: jwt.id } });
        const isFollowed = [];
        for (let record of followedArr) {
          isFollowed[record.dataValues.followedId] = true;
        }
        res.send({ data: rankingArr.map((record) => ({
          username: record.dataValues.userId,
          photourl: record.dataValues.pictureurl,
          coin: record.dataValues.coin,
          following: record.dataValues.id === jwt.id ? 'me' : Boolean(isFollowed[record.dataValues.id])
        })) });
      }
      else {
        res.status(400).send({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).send({ 'message': 'Sorry Can\'t process your request' });
      throw error;
    }
  },
};