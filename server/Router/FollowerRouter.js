const { follow, unFollow, sendFollowingList } = require('../Controller/FollowerController');
const express = require('express');
const router = express.Router();

router.post('/', follow);
router.get('/', sendFollowingList);
router.delete('/', unFollow);

module.exports = router;