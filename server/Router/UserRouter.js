const {signUp,sendUserInfo,updateWord,unRegister,imageUpload} = require('../Controller/UserController');
const exress = require('express');
const router = exress.Router();

router.post('/',signUp);
router.post('/image',imageUpload);
router.get('/',sendUserInfo);
router.patch('/',updateWord);
router.delete('/',unRegister);


module.exports = router;