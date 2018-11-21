// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// is valid timestamp?
function validTimestamp(date) {
  return moment.unix(date).isValid();
};

// is valid natural date?
function validNaturalDate(date) {
  return moment(date, "YYYY-MM-DD").isValid();
};

// convert to timestamp
function convertToTimeStamp(date) {
  return moment(date, "YYYY-MM-DD").unix();
};

// convert to natural date
function convertToNaturalDate(date) {
  return moment.unix(date).format("YYYY-MM-DD");
};

// get date
app.get('/api/timestamp/:date', function(req, res) {
  let date = req.params.datestring;
  let unixTimestamp;
  let naturalDate;
  
  if (validTimestamp(date)) {
    unixTimestamp = date;
    naturalDate = convertToNaturalDate(date);
  } else if (validNaturalDate(date)) {
    unixTimestamp = convertToTimeStamp(date);
    naturalDate = date;
  } else {
    unixTimestamp = null;
    naturalDate = "Invalid Date";
  }
  
  let time = {unix: unixTimestamp, utc: naturalDate};
  
  res.json(time);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});