const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
const News = new Schema({
        source: {
            type: String,
        },
        category: {
            type: String
        },
        target: {
            type: String
        },
        desc: {
            type: String
        }
},{
    timestamps: true,
    collection: 'news'
});


module.exports = mongoose.model('news', News);
