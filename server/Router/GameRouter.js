const {checkAnswer,updateCoin} = require('../Controller/GameController');
const exress = require('express');
const router = exress.Router();

router.post('/answer',checkAnswer);
router.put('/coin_update',updateCoin);


module.exports = router;