const { oauthLogin } = require('../Controller/OauthController');
const express = require('express');
const router = express.Router();

router.post('/', oauthLogin);

module.exports = router;