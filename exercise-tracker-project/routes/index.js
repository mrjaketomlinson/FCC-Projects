var express = require('express');
var router = express.Router();
var moment = require('moment');

var User = require('../models/user');


// Home page
router.get('/', (req, res) => {
  res.render('index');
});

// Post User
router.post('/api/exercise/new-user', (req, res) => {
  User.create({username: req.body.username, count: 0}, (err, newUser) => {
    if (err) {
      console.log(err);
      res.send("Creation error: " + err.message);
    } else {
      res.json({_id: newUser._id, username: newUser.username});
    };
  });
});

// Get all users
router.get('/api/exercise/users', (req, res) => {
  User.find({}, 'username', (err, foundUsers) => {
    res.json(foundUsers);
  });
});

// Post exercise
router.post('/api/exercise/add', (req, res) => {
  var description = req.body.description;
  var duration = req.body.duration;
  var date;
  if (req.body.date === '') {
    date = moment().format("YYYY-MM-DD");
  } else {
    date = req.body.date;
  }
  User.findOne({username: req.body.userId}, (err, foundUser) => {    
    if (err) {
      console.log(err);
      res.send("Error adding your exercise.");
    } if (!foundUser) {
      res.send("USER NOT FOUND");
    } else {
      var newData = {description, duration, date};
      foundUser.exercise.push(newData);
      foundUser.count = foundUser.count + 1;
      foundUser.save((err, newExercise) => {
        if (err) {
          res.send("Error: " + err.message);
        } else {
          var data = {
            username: newExercise.username,
            description: description,
            duration: duration,
            date: date
          }
          res.json(data);
        }
      });
    }
  });
});

// Get search
router.get('/api/exercise/log', (req, res) => {
  var username = req.query.userId;
  var fromDate = req.query.from;
  var toDate = req.query.to;
  var limit = parseInt(req.query.limit);

  User.findOne({username}, (err, user) => {
    if (err) {
      res.send("Error: " + err.message);
    }
    if (!user) {
      res.send("User not found");
    } else {
      // res.json(user.username);
      var data = {};
      data.username = user.username;
      data.count = user.count;
      // res.json(data);
      if (fromDate) data.from = fromDate;
      if (toDate) data.to = toDate;
      data.exercise = user.exercise.filter((elem) => {
        if (fromDate && toDate) {
          return elem.date >= fromDate && elem.date <= toDate;
        } else if (fromDate) {
          return elem.date >= fromDate;
        } else if (toDate) {
         return elem.date <= toDate;
        } else {
         return true;
        }
      });
      if (limit) {
        var slicedData = data.exercise.slice(0, limit);
        data.exercise = slicedData;
      }
      res.json(data);
    }
  });
});

module.exports = router;