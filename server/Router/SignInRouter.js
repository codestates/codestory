const { signIn } = require('../Controller/SignInController');
const express = require('express');
const router = express.Router();

router.post('/', signIn);

module.exports = router;