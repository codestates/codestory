const {oauthLogin} = require('../Controller/OauthController');
const exress = require('express');
const router = exress.Router();

router.post('/',oauthLogin);

module.exports = router;