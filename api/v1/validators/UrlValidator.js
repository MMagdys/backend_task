const { body, check } = require('express-validator');


exports.createUrl = (req, res) => {

    return [
        body('name').not().isEmpty().withMessage('name is required'),
        body('url').not().isEmpty().withMessage('url is required'),
        body('protocol').not().isEmpty().withMessage('protocol is required'),
        body('protocol').isIn(['http', 'https', 'tcp']).withMessage('Invalid value for protocol')
    ];
}