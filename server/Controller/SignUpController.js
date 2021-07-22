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
  }
}