const { isAuthorizedJwt } = require('./JsonToken');
const db = require('../models');
module.exports = {
  checkAnswer: async (req, res) => {
    try {
      const jwt = isAuthorizedJwt(req);
      if (jwt) {
        const result = await db.scripts.findOne({ where: { stage: req.body.stage } });
        const { answer, content } = result.dataValues;
        const isCorrect = answer ? answer.split('  ').includes(req.body.command.trim().replace(/\s+/g, ' ')) : true;
        res.send({
          result: isCorrect,
          script: isCorrect ? content : undefined
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
  updateCoin: async (req,res)=>{
    try {
      let accessTokenData=isAuthorizedJwt(req);
      if (accessTokenData) {
        const result = db.user.update(
          {
            coin:req.body.newCoin
          },
          {
            where : { id : accessTokenData.id}
          })
        
          if(result){
            res.status(200).json({"message":"ok"});
          }
      }else {
        res.status(400).send({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    }
  }
};