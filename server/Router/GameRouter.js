const { checkAnswer, updateCoin } = require('../Controller/GameController');
const express = require('express');
const router = express.Router();

router.post('/answer', checkAnswer);
router.patch('/coin', updateCoin);


module.exports = router;