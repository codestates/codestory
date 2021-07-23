const {follow,unFollow,sendFollowingList} = require('../Controller/FollowerController');
const exress = require('express');
const router = exress.Router();

router.post('/', follow);
router.get('/',sendFollowingList);
router.delete('/',unFollow);

module.exports = router;