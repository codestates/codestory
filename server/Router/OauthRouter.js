const {oauthLogin,oauthAuthorization} = require('../Controller/OauthController');
const exress = require('express');
const router = exress.Router();

router.post('/',oauthLogin);
router.get('/',oauthAuthorization)

module.exports = router;