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
    //updateCoin 함수를 채워주세요.
    return res.status(200).send('/game/updatecoin 라우팅완료');
  }
};