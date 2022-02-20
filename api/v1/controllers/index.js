const express = require('express');
const router = express.Router();
const { isAuthUser } = require('../../../services/user/UserAuthService')

const AuthController = require('./AuthController');
const UrlController = require('./UrlController');


router.use('/auth', AuthController)
router.use('/url', isAuthUser, UrlController)


module.exports = router;