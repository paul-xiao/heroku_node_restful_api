const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Course
var Test = new Schema({
    course_name: {
        type: String
    },
    course_price: {
        type: Number
    }
},{
    timestamps: true,
    collection: 'test'
});

module.exports = mongoose.model('Test', Test);
