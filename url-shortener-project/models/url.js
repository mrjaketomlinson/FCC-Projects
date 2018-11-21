var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  originalUrl: String,
  shortUrl: String
});

module.exports = mongoose.model('Url', UrlSchema);