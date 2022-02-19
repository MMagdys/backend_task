exports.sendResponse = (res, message) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(message)
}


exports.sendError = (res, message) => {

    res.statusCode = 422;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        message: message
    })
}