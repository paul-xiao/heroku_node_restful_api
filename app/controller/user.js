const User = require('../models/User');
const config = require('../config/db');
const jwt = require('jwt-simple');
//signup
exports.signUp = (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    console.log(req.body)
    newUser.save().then(data => {
        res.json({success: true, msg: 'Successful created new user.'});
    }).catch(err => {
        res.status(500).send({
            status: false,
            message: err.message
        })
    })
};

//signin

exports.signIn = (req, res) => {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        console.log(user)
        if (err) throw err;
        if (!user) {
        res.json({success: false, msg: 'Authentication failed. User not found.'});
        } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'bearer ' + token});
            console.log(token)
            } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        });
        }
    });
}



// drop user

exports.delete = (req, res) => {
    console.log(req.params.id)
    User.findByIdAndRemove(req.params.id)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with name " + req.params.id
                });
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
};



exports.findAll = (req, res) => {
    User.find().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    })
};

exports.getUser= (req, res) => {
    var token = getToken(req.headers);
    console.log(token);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      console.log(decoded.username);
      User.findOne({
        username: decoded.username
      }, function(err, user) {
          console.log(user)
          if (err) throw err;
   
          if (!user) {
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
          } else {
            res.json({success: true, user: user.username});
          }
      });
    } else {
      return res.status(403).send({success: false, msg: 'No token provided.'});
    }
  };
   
  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };