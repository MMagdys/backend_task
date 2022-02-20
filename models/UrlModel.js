const mongoose = require('mongoose');
const schema = mongoose.Schema;
const appDB = require('../config/Config').appDB;
const connect = mongoose.createConnection(appDB);


const AuthenticationHeaderSchema = new schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})


const AssertSchema = new schema({
    statusCode: {
        type: Number,
        required: true,
    },
})


const UrlSchema = new schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        require: true,
    },
    protocol: {
        type: String,
        enum: ['http', 'https', 'tcp'],
        require: true,
    },
    path: {
        type: String,
    },
    port: {
        type: Number,
    },
    webhook: {
        type: String,
    },
    timeout: {
        type: Number,
        defaults: 5
    },
    interval: {
        type: Number,
        defaults: 10
    },
    threshold: {
        type: Number,
        defaults: 1
    },
    interval: {
        type: Number,
        defaults: 10
    },
    authentication: {
        type: AuthenticationHeaderSchema,
    },
    httpHeaders: {
        type: mongoose.Schema.Types.Mixed,
    },
    assert: {
        type: AssertSchema,
    },
    tags: [{
        type: String
    }],
    ignoreSSL: {
        type: Boolean,
    },

},{
	timestamps: true
});


module.exports = connect.model('Url', UrlSchema);