const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const db = require('./config/db');


const app = express();
app.use(bodyParser.json());

mongoose.connect(db.DB, {
    useNewUrlParser: true
}).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database' + err)
    });

const Test = require('./controller/test')
app.get('/',(req, res) => {
    res.send('hello, this is home page!')
});    
app.get('/test', Test.create);

module.exports = app