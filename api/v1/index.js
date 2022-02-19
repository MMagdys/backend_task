const express = require('express');
const router = express.Router();
const { isAuthUser } = require('../../services/user/UserAuthService')

const AuthController = require('./AuthController');


router.use('/auth', AuthController)
router.use('/url', isAuthUser, AuthController)


module.exports = router;