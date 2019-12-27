const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const db = require('./config/db');
const cors = require('cors');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(db.DB, {
    useNewUrlParser: true,
    useCreateIndex: true
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
// stratgey
require('./config/passport')(passport);

app.post('/signup', userController.signUp);
app.post('/signin', userController.signIn);
app.delete('/user/:id', userController.delete);
app.get('/user', userController.findAll);
app.get('/userinfo', passport.authenticate('jwt', {
    session: false
}), userController.getUser);
app.post('/user/update', passport.authenticate('jwt', {
    session: false
}), userController.editUser);

//post
const postController = require('./controller/post');

app.post('/savepost', upload.single('file'), postController.savePost)
app.get('/getpost', postController.getPost)
app.get('/getfile/:id', postController.getFile)
app.delete('/delpost/:id', postController.delPost)


// graph

const graphController = require('./controller/graph')

app.post('/graph/add', graphController.addGraph)
app.get('/graph', graphController.getGraph)
app.get('/graph/:id', graphController.getGraphById)

// news

const newsController = require('./controller/news')
app.get('/news/crawl', newsController.crawlNews)




module.exports = app