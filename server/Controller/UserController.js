const { isAuthorizedJwt,generateAccessToken,sendAccessToken} = require('./JsonToken');
const {isAuthorizedOauth} = require('./OauthToken.js');
const models = require('../models/index.js');
const { Op } = require('sequelize');
const multer = require('multer');
const moment = require('moment');
const multerS3 =require('multer-s3');
const aws = require('aws-sdk');
const dotenv=require('dotenv');
dotenv.config();

module.exports = {
  signUp: async (req, res) => {
    try{
      const username=req.body.username;
      const password=req.body.password;
      const data=await models.users.findOne({where : {userId:username}});
      if(data){
        res.status(400).json({message:'Bad Request'});
      }else{
        const time=Date.now();
        const result = await models.users.create({
          pictureurl: '../?',
          userId : username,
          password : password,
          coin : 0,
          createdAt : time,
          updatedAt : time
        });
        delete result.dataValues.password;
        const accessToken = generateAccessToken(result.dataValues);
        sendAccessToken(res,accessToken);
      }  
    }
    catch(error){
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  },
  sendUserInfo: async (req, res) => {
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt) {
        const result = await models.users.findOne({ where: { id: jwt.id } });
        const follower = await models.follower_followeds.count({ where: { followedId: jwt.id } });
        const following = await models.follower_followeds.count({ where: { followerId: jwt.id } });
        const rankingArr = await models.users.findAll({ order: [['coin', 'DESC'], ['id', 'ASC']] });
        const idArr = rankingArr.map((user) => user.dataValues.id);
        const ranking = idArr.indexOf(jwt.id) + 1;
        res.status(200).json({
          username: result.userId,
          photourl: result.pictureurl,
          coin: result.coin,
          intro: result.word,
          ranking,
          follower,
          following
        });
      }else if(oauth){
        let username,photourl;
        if(oauth.data.kakao_account){
          username=oauth.data.properties.nickname;
          photourl=oauth.data.properties.profile_image;
        }else{
          username=oauth.data.name;
          photourl=oauth.data.picture;
        }
        res.status(200).json({
          username:username,
          photourl:photourl,
          coin: 0,
          intro: '반갑습니다.',
          ranking:10000,
          follower: 0,
          following:0
        });
      }
      else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).json({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  },
  updateWord: async (req, res) => {
    try {
      const jwt = isAuthorizedJwt(req);
      const oauth=isAuthorizedOauth(req);
      if (jwt) {
        await models.users.update({ word: req.body.word }, { where: { id: jwt.id } });
        res.status(200).json({ message: 'ok' });
      }else if(oauth){
        res.status(200).json({message:'ok'});
      }else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).json({ 'message': 'Sorry Can\'t process your request' });
      throw error;
    }
  },
  unRegister: async (req,res)=>{
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth= await isAuthorizedOauth(req);
      if (jwt) {
        await models.follower_followeds.destroy({ where: { [Op.or]: [{ followerId: jwt.id }, { followedId: jwt.id }] } });
        await models.users.destroy({ where: { id: jwt.id } });
        res.cookie('accessToken', 'invalid Token');
        res.status(200).json({ message: 'ok' });
      }else if(oauth){
        res.status(200).json({message:'ok'});
      }
      else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).json({ 'message': 'Sorry Can\'t process your request' });
      throw error;
    }
  },
  imageUpload: async(req,res,next)=>{
    try{
      const jwt= await isAuthorizedJwt(req);
      const oauth= await isAuthorizedOauth(req);
      if(jwt){
        const s3 = new aws.S3({
          accessKeyId: process.env.AW_ACCESSKEY,
          secretAccessKey: process.env.AW_SECRETKEY, 
          region: 'ap-northeast-2' 
        });
        const storage = multerS3({
          s3: s3,
          bucket: 'codestoryimagecontainor',
          acl: 'public-read',   
          metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname}); 
          },
          key: function (req, file, cb) {
            cb(null, moment().format('YYYYMMDDHHmmss') + '_' + file.originalname);
          }
        });
        
        const upload = multer({ storage: storage }).single('file');

        upload(req, res, function(err) {
          if (err instanceof multer.MulterError) {
            return next(err);
          } else if (err) {
            return next(err);
          }
<<<<<<< HEAD
          models.users.update({pictureurl:req.file.location},{where:{id:jwt.id}})
=======
          models.users.update({pictureurl:req.file.location},{where:{id:jwt.id}});
>>>>>>> aa2b396b870be34546b1eb0197fceff615dc58bb
          return res.status(200).json(req.file.location);
        });
      }else if(oauth){
        return res.status(200).json('https://codestoryimagecontainor.s3.ap-northeast-2.amazonaws.com/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85+%EA%B6%8C%EC%9C%A0+%EC%9D%B4%EB%AF%B8%EC%A7%80.png');
      }else{
        return res.status(400).json({message: 'invalid token'});
      }
    }
    catch(error){
      res.status(500).json({'message':'Sorry Can\'t process your request'});
    }
  }
};
