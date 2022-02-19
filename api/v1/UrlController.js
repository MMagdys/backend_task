const express = require('express');
const UrlRouter = express.Router();
const UserAuthService = require('../../services/user/UserAuthService');
const ResponseUtils = require('../../utils/ResponseUtils');


UrlRouter.get('/', UserAuthService.authenticate, async function(req, res, next) {

    
});


UrlRouter.post('/signup', async function(req, res, next) {

});


module.exports = UrlRouter;  