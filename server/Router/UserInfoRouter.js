const {sendUserInfo,sendFollowingList,unRegister} = require('../Controller/UserInfoController');
const exress = require('express');
const router = exress.Router();

router.get('/',sendUserInfo);
router.get('/following_list',sendFollowingList)
router.delete('/unregister',unRegister)


module.exports = router;