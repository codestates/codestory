const {sendRanking} = require('../Controller/RankingController');
const exress = require('express');
const router = exress.Router();

router.get('/',sendRanking);


module.exports = router;