const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
const Post = new Schema({
    file: {
        data: Buffer,
        contentType: String
    },
    desc: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    collection: 'post'
});


module.exports = mongoose.model('Post', Post);
