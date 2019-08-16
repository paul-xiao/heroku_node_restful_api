const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const db = require('./config/db');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(db.DB, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database is connected')
}, err => {
    console.log('Can not connect to the database' + err)
});

// home
app.get('/', (req, res) => {
    res.send('hello, this is home page!')
});

// usr auth
const userController = require('./controller/user');
const passport = require('passport');
app.post('/signup', userController.signUp);
app.post('/signin', userController.signIn);
app.delete('/user:id', userController.delete);
app.get('/user', userController.findAll);
app.get('/userinfo', passport.authenticate('jwt', {
    session: false
}), userController.getUser);

module.exports = app