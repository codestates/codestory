const {signUp,sendUserInfo,updateWord,unRegister} = require('../Controller/UserController');
const exress = require('express');
const router = exress.Router();

router.post('/',signUp)
router.get('/',sendUserInfo);
router.patch('/',updateWord)
router.delete('/',unRegister)


module.exports = router;