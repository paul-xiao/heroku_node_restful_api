const Post = require('../models/Post');
const fs = require('fs');


// save image and desc

exports.savePost = (req, res) => {
   
    // const newPost = new Post({
    //     image: {
    //         data: fs.readFileSync(req.file.path),
    //         contentType: req.file.mimetype
    //     },
    //     desc: req.body.desc
    // });
    // newPost.save();
    console.log(req.body)
   res.send({
       message: 'upload success',
    //    post: {
    //     image: req.file.originalname,
    //     desc: req.body.desc
    //   }
   })
}

exports.getPost = (res, req) => {

}

exports.editPost = (res, req) => {

}


exports.delPost = (res, req) => {

}