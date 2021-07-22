const {signIn} = require('../Controller/SignInController');
const exress = require('express');
const router = exress.Router();

router.post('/',signIn);


module.exports = router;