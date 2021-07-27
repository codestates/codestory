const { isAuthorizedJwt } = require('./JsonToken');
const {isAuthorizedOauth} = require('./OauthToken.js');
const db = require('../models');
module.exports = {
  checkAnswer: async (req, res) => {
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt || oauth) {
        const result = await db.scripts.findOne({ where: { stage: req.body.stage } });
        const { answer, content } = result.dataValues;
        const isCorrect = answer ? answer.split('  ').includes(req.body.command.trim().replace(/\s+/g, ' ')) : true;
        res.status(200).json({
          result: isCorrect,
          script: isCorrect ? content : undefined
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
  updateCoin: async (req,res)=>{
    try {
      const accessTokenData=await isAuthorizedJwt(req);
      const oauth=await isAuthorizedOauth(req);

      if (accessTokenData) {
        await db.users.update(
          {
            coin:req.body.newCoin
          },
          {
            where : { id : accessTokenData.id}
        })
        res.status(200).json({"message":"ok"});
      }else if(oauth){
        res.status(200).json({"message":"ok"});
      }else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).json({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};
