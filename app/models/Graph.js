const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
const Graph = new Schema({
    nodes: {
        nodename: {
            type: String,
            unique: true
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
    }
},{
    timestamps: true,
    collection: 'graph'
});


module.exports = mongoose.model('Graph', Graph);
