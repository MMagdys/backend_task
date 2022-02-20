const express = require('express');
const UrlRouter = express.Router();
const UrlRepository = require('../../../repositories/UrlRepository');
const ResponseUtils = require('../../../utils/ResponseUtils');
const UrlValidator = require('../validators/UrlValidator');
const { validationResult } = require('express-validator');


UrlRouter.get('/', async function(req, res, next) {

    const userId = req.user._id;
    const page = req.params.page || 1;
    const limit = req.params.limit || 25;

    const urls = await UrlRepository.findByUser(userId, page, limit);

    return ResponseUtils.sendResponse(res, {
        urls
    })
});


UrlRouter.post('/', UrlValidator.createUrl() ,async function(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return ResponseUtils.sendError(res, errors.errors[0].msg)
    }

    const userId = req.user._id;
    const urlData = req.body;

    const createdUrl = await UrlRepository.create(userId, urlData);

    return ResponseUtils.sendResponse(res, {
        Url: createdUrl
    })
});


UrlRouter.put('/',async function(req, res, next) {

    const userId = req.user._id;
    const urlData = req.body;

    const updatedUrl = await UrlRepository.update(userId, urlData.urlId, urlData);
    if(!updatedUrl) {
        return ResponseUtils.sendError(res, 'Url not found!')
    }

    return ResponseUtils.sendResponse(res, {
        Url: updatedUrl
    })
});


UrlRouter.delete('/',async function(req, res, next) {

    const userId = req.user._id;
    const urlId = req.body.urlId;

    const deletedUrl = await UrlRepository.delete(userId, urlId);
    if(!deletedUrl) {
        return ResponseUtils.sendError(res, 'Url not found!')
    }

    return ResponseUtils.sendResponse(res, {
        status: 'Ok',
        Url: deletedUrl
    })
});


module.exports = UrlRouter;  