const {follow} = require('../Controller/FollowController');
const exress = require('express');
const router = exress.Router();

router.post('/', follow);

module.exports = router;