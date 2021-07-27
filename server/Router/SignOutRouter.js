const {signOut} = require('../Controller/SignOutController');
const exress = require('express');
const router = exress.Router();

router.get('/',signOut);


module.exports = router; 