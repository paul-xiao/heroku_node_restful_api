const Test = require('../model/test');

exports.create = (req, res) => {
    const newCourse = new Test({
        course_name: req.query.course_name,
        course_price: req.query.course_price
    });
    newCourse.save().then(data => {
        res.json(data);
        console.log('inseted data' + data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};