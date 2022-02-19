require('dotenv').config()


module.exports = {
    appDB               : process.env.MONGODB_URI || 'mongodb://localhost:27017/backend_task',
    idTokenTimeToLive   : '30m',
    privateKey          : 'secret'
}