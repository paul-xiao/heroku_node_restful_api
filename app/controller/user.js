const User = require("../models/User");
const config = require("../config/db");
const jwt = require("jwt-simple");

//signup
exports.signUp = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  User.findOne(
    {
      username: req.body.username
    },
    (err, example) => {
      if (err) console.log(err);
      if (example) {
        res.send({
          message: "User already exist"
        });
      } else {
        newUser
          .save()
          .then(data => {
            res.json({
              message: "Successful created new user."
            });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message
            });
          });
      }
    }
  );
};

//signin

exports.signIn = (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      console.log(user);
      if (err) throw err;
      if (!user) {
        res.json({
          message: "Authentication failed. User not found."
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({
              token: "bearer " + token
            });
            console.log(token);
          } else {
            res.send({
              message: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
};

// drop user

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with name " + req.params.id
        });
      }
      res.send({
        message: "Note deleted successfully!"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
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
  const token = getToken(req.headers);
  if (token) {
    User.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
        });
      });
  } else {
    return res.status(401).send({
      message: "Unauthorized"
    });
  }
};

exports.getUser = (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const decoded = jwt.decode(token, config.secret);
    User.findOne(
      {
        username: decoded.username
      },
      function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(401).send({
            message: "Authentication failed. User not found."
          });
        } else {
          const { username, id, createdAt, updatedAt } = user;
          res.json({
            success: true,
            userInfo: {
              username,
              id,
              createdAt,
              updatedAt
            }
          });
        }
      }
    );
  } else {
    return res.status(401).send({
      message: "Unauthorized"
    });
  }
};

exports.editUser = (req, res) => {
  const token = getToken(req.headers);
  const profile = {
    avatar: "",
    nickname: "",
    region: "",
    slogan: ""
  };
  const { body } = req;
  if (token) {
    const decoded = jwt.decode(token, config.secret);
    User.update(
      {
        username: decoded.username
      },
      { ...profile, body },
      function(err) {
        if (err) throw err;
      }
    );
  } else {
    return res.status(401).send({
      message: "Unauthorized"
    });
  }
};

getToken = function(headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
