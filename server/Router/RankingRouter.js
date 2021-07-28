const { sendRanking } = require('../Controller/RankingController');
const express = require('express');
const router = express.Router();

router.get('/', sendRanking);

module.exports = router;