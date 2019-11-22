const Post = require('../models/Post');
const fs = require('fs');
const {
    promisify
} = require('util')
const unlinkAsync = promisify(fs.unlink)
const ObjectId = require('mongodb').ObjectId;



/*
* save file and desc
* web
* mobile
*/
exports.savePost = async (req, res) => {
    const newPost = new Post({
        file: {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype,
            name: req.file.originalname
        },
        desc: req.body.desc
    });

   try {
    await newPost.save().catch(error => {
        res.send({
            message: error.message || 'fail'
        })
    })
   } catch (error) {
       console.log(error)
   }

    await unlinkAsync(req.file.path)
    res.send({
        message: 'upload success',
        post: {
            file: req.file.originalname,
            desc: req.body.desc
        }
    })
}
//
exports.getPost = (req, res) => {
    Post.find().then(data => {
        const posts = []
        const domain = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : 'http://192.168.196.75:8080'
        data.forEach(item => {
            posts.push({
                'id': item.id,
                'url': `${domain}/getfile/${item.id}`,
                'desc': item.desc,
                'contentType': item.file && item.file.contentType || 'undefined'
            })
        })

        res.send(posts)
    }).catch(err => {
        res.send({
            error: err.message || 'fail'
        })
    })
}

exports.getFile = (req, res) => {
    Post.findOne({
        _id: new ObjectId(req.params.id)
    }, function (err, item) {
        if (item && item.file) {
            res.contentType(item.file.contentType)
            res.send(item.file.data)
        } else {
            console.log(err)
        }
    })
}

exports.editPost = (req, res) => {

}


exports.delPost = (req, res) => {
    Post.findByIdAndRemove(req.params.id).then(note => {
        res.send({
            state: 'del success'
        })
    }).catch(err => {
        res.send({
            state: err.message || 'del failed'
        })
    })
}

