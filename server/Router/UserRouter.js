const { signUp, sendUserInfo, updateWord, unRegister, imageUpload } = require('../Controller/UserController');
const express = require('express');
const router = express.Router();

router.post('/', signUp);
router.post('/image', imageUpload);
router.get('/', sendUserInfo);
router.patch('/', updateWord);
router.delete('/', unRegister);

module.exports = router;