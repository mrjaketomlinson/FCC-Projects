var express = require('express');
var router = express.Router();
var dns = require('dns');
var cryptoRandomString = require('crypto-random-string');
var Url = require('../models/url');
var isAbsoluteUrl = require('is-absolute-url');

// home page
router.get('/', function(req, res){
  res.render('index');
});

// post on home page
router.post('/shorturl', function(req, res) {
  let original_url = req.body.url;
  let short_url = 'https://resolute-snout.glitch.me/' + cryptoRandomString(8);
  let new_data = {originalUrl: original_url, shortUrl: short_url};
  if (isAbsoluteUrl(original_url)) {
    Url.create(new_data, (err, newlyCreated) => {
      if (err) {
        console.log(err);
      } else {
        res.json({original_url: newlyCreated.originalUrl, short_url: newlyCreated.shortUrl});
      }
    });
  } else {
    res.json({error: 'invalid URL'});
  }
});

// show all shortened urls
router.get('/shorturl/all', function(req, res) {
  Url.find({}, function(err, foundUrls) {
    if (err) {
      console.log(err);
      res.status(err.status || 500).send({"error": err.message});
    } else {
      res.render('all', {urls: foundUrls});
    }
  });
});

router.get('/:surl', function(req, res) {
  Url.findOne({shortUrl: 'https://resolute-snout.glitch.me/' + req.params.surl}, function(err, foundUrl) {
    if (err) {
      console.log(err)
    } else {
      res.redirect(foundUrl.originalUrl);
    }
  });
});

module.exports = router;