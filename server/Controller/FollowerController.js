const { isAuthorizedJwt } = require('./JsonToken.js');
const {isAuthorizedOauth} = require('./OauthToken.js');
const db = require('../models');
module.exports = {
  follow: async (req, res) => {
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      
      if (jwt) {
        const followed = await db.users.findOne({ where: { userId: req.body.username } });
        await db.follower_followeds.create({
          followerId: jwt.id,
          followedId: followed.dataValues.id
        });
        res.send({ result: true });
      }else if(oauth){
        res.send({ result: false});
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
      const jwt = await isAuthorizedJwt(req);
      if (jwt) {
        const followed = await db.users.findOne({ where: { userId: req.body.username } });
        await db.follower_followeds.destroy({ where: {
          followerId: jwt.id,
          followedId: followed.dataValues.id
        } });
        res.send({ message: 'ok' });
      }else if(oauth){
        res.send({message:'ok'})
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
      const oauth = isAuthorizedOauth(req);
      if (jwt) {
        const followingArr = await db.follower_followeds.findAll({ where: { followerId: jwt.id }, order: [['id', 'DESC']] });
        const userArr = await db.users.findAll();
        const userinfoArr = [];
        for (let record of userArr) {
          userinfoArr[record.dataValues.id] = { username: record.dataValues.userId, photourl: record.dataValues.pictureurl };
        }
        res.send({ data: followingArr.map((record) => userinfoArr[record.dataValues.followedId]) });
      }else if(oauth){
        res.send({data : []});
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