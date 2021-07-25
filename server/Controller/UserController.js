const { isAuthorizedJwt } = require('./JsonToken');
const models = require('../models/index.js');
const { Op } = require('sequelize');

module.exports = {
  signUp: async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    const data=await models.users.findOne({where : {userId:username}});
    if(data){
      res.status(400).json({message:'Bad Request'});
    }else{
      const time=Date.now();
      const result=await models.users.create({
        pictureurl: '../?',
        userId : username,
        password : password,
        coin : 0,
        createdAt : time,
        updatedAt : time
      });
      if(result){
        res.status(200).json({message:'ok'});
      }else{
        res.status(500).json({message:'sorry Can\'t process your request'});
      }
    }  
  },
  sendUserInfo: async (req, res) => {
    try {
      const jwt = isAuthorizedJwt(req);
      if (jwt) {
        const result = await models.users.findOne({ where: { id: jwt.id } });
        const follower = await models.follower_followeds.count({ where: { followedId: jwt.id } });
        const following = await models.follower_followeds.count({ where: { followerId: jwt.id } });
        const rankingArr = await models.users.findAll({ order: [['coin', 'DESC'], ['id', 'ASC']] });
        const idArr = rankingArr.map((user) => user.dataValues.id);
        const ranking = idArr.indexOf(jwt.id) + 1;
        res.send({
          username: result.userId,
          photourl: result.pictureurl,
          coin: result.coin,
          intro: result.word,
          ranking,
          follower,
          following
        });
      }
      else {
        res.status(400).send({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  },
  updateWord: async (req, res) => {
    try {
      const jwt = isAuthorizedJwt(req);
      if (jwt) {
        await models.users.update({ word: req.body.word }, { where: { id: jwt.id } });
        res.send({ message: 'ok' });
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
  unRegister: async (req,res)=>{
    try {
      const jwt = isAuthorizedJwt(req);
      if (jwt) {
        await models.follower_followeds.destroy({ where: { [Op.or]: [{ followerId: jwt.id }, { followedId: jwt.id }] } });
        await models.users.destroy({ where: { id: jwt.id } });
        res.cookie('jwtAccessToken', 'invalid Token');
        res.status(200).send({ message: 'ok' });
      }
      else {
        res.status(400).send({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).send({ 'message': 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};