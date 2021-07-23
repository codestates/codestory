const models = require('../models/index.js')

module.exports = {
  signUp: async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    const data=await models.users.findOne({where : {userId:username}})
    if(data){
      res.status(400).json({"message":"Bad Request"})
    }else{
      const time=Date.now();
      const result=await models.users.create({
        pictureurl: '../?',
        userId : username,
        password : password,
        coin : 0,
        createdAt : time,
        updatedAt : time
      })
      if(result){
        res.status(200).json({"message":"ok"});
      }else{
        res.status(500).json({"message":"sorry Can't process your request"});
      }
    }  
  },
  sendUserInfo: async (req, res) => {
    //sendUserInfo 함수를 채워주세요
    return res.status(200).send('/user userInfo 라우팅완료');
  },
  updateWord: async (req, res) => {
    //updateWord 함수를 채워주세요
    return res.status(200).send('/user updateWord 라우팅완료');
  },
  unRegister: async (req,res)=>{
    //unRegister함수를 채워주세요
    return res.status(200).send('/user unRegister 라우팅완료')
  }
};