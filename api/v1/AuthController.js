const express = require('express');
const AuthRouter = express.Router();
const UserAuthService = require('../../services/user/UserAuthService');
const ResponseUtils = require('../../utils/ResponseUtils');


AuthRouter.post('/login', UserAuthService.authenticate, async function(req, res, next) {

    const user = req.user;
    const idToken = await UserAuthService.getIdToken(user);
    if(!idToken) {
        return ResponseUtils.sendError(res, 'Unauthorized')
    }

    return ResponseUtils.sendResponse(res, {
        idToken
    })
});


AuthRouter.post('/signup', async function(req, res, next) {
    
    const createdUser = await UserAuthService.register(req.body);
    const idToken = await UserAuthService.getIdToken(createdUser);
    if(!idToken) {
        return ResponseUtils.sendError(res, 'Unauthorized')
    }

    return ResponseUtils.sendResponse(res, {
        idToken
    })
});


module.exports = AuthRouter;  