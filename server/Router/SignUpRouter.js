const {signUp} = require('../Controller/SignUpController');
const exress = require('express');
const router = exress.Router();

router.post('/',signUp);


module.exports = router;