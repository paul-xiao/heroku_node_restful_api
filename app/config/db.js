module.exports = {
    secret:'paultest',
    DB: process.env.MONGODB_URI|| 'mongodb://127.0.0.1:27017/test'  // 'mongodb://mongo:27017/test'
}
