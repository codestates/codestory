const { signOut } = require('../Controller/SignOutController');
const express = require('express');
const router = express.Router();

router.get('/', signOut);

module.exports = router; 