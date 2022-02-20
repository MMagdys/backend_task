const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const appDB = require('../config/Config').appDB;
const connect = mongoose.createConnection(appDB);


const UserSchema = new schema({

	name: {
		type: String
    },
	email: {
        type: String,
        require: true
	}
}, {
	timestamps: true
});

UserSchema.plugin(passportLocalMongoose,  { usernameField : 'email' });

module.exports = connect.model('User', UserSchema);