const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
const UserRepository = require('../../repositories/UserRepository');
const Config = require('../../config/Config')


passport.use(new LocalStrategy( {usernameField: 'email', session: false}, UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

exports.authenticate = passport.authenticate('local');


exports.register =  async (userData) => {
    
    const savedUser = await UserRepository.save(userData);
    if(!savedUser) {
        return;
    }

    return savedUser;
};


exports.getIdToken = function (user) {
    
    const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

	return jwt.sign(userInfo, Config.privateKey,{
        issuer: 'mmagdys',
        expiresIn: Config.idTokenTimeToLive
    });
};


let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Config.privateKey;
opts.issuer = 'mmagdys';


exports.jwtPassport = passport.use('userjwt', 
    
    new JwtStrategy(opts, async (jwt_payload, done) => {
        
        const retrievedUser = await UserRepository.findById(jwt_payload._id);

        if(!retrievedUser) {
            const error = new Error('User not Found');
            return done(error, false);
        }

        return done(null, retrievedUser);
    })
);

exports.isAuthUser = passport.authenticate('userjwt', {session: false});
