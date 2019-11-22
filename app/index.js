const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const db = require('./config/db');
const cors = require('cors');
const crawler = require('./utils/crawler')
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

let data = []
crawler.queue([{
    uri: 'https://www.jianshu.com/',
    jQuery: true,

    // 覆盖全局的callback
    callback: function (error, res, done) {
        if(error){
            console.log(error);
        }else{
           const $ = res.$
           $('.note-list li').each(function(index){
              let a = {
                  id: index,
                  url: $(this).find('a.title').attr('href'),
                  title: $(this).find('a.title').text(),
                  abstract: $(this).find('.abstract').text(),
                  nickname: $(this).find('.nickname').text()
              }
              data.push(a)
           })
           // console.log(data)
          
        }
        done();
    }
}])


app.get('/test', (req, res) => {
    res.send(data)
});
let content = {}

app.get('/test/:id', async (req, res) => {
   const traget = data.filter(item => item.id === parseInt(req.params.id))
   console.log(traget[0].url)
    await crawler.queue([{
        uri: 'https://www.jianshu.com'+ traget[0].url,
        jQuery: true,
    
        // 覆盖全局的callback
        callback: function (error, res, done) {
            if(error){
                console.log(error);
            }else{
               const $ = res.$
               content.title = $('.ouvJEz h1').text() 
            }
            done();
        }
    }])
    res.send(content)
    console.log(content)
});




module.exports = app